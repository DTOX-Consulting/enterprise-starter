/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { RxReplicationState } from 'rxdb/plugins/replication';
import { Subject } from 'rxjs';

import { hash } from '@/lib/utils/string';
import { stringifyDeterministic } from '@/lib/utils/stringify';

import type { GenericObject } from '@/lib/utils/object';
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import type {
  WithDeleted,
  RxCollection,
  ReplicationOptions,
  ReplicationPullHandlerResult,
  ReplicationPullOptions,
  ReplicationPushOptions,
  RxReplicationPullStreamItem,
  RxReplicationWriteToMasterRow
} from 'rxdb';

const DEFAULT_LAST_MODIFIED_FIELD = '_modified';
const DEFAULT_DELETED_FIELD = '_deleted';
const POSTGRES_DUPLICATE_KEY_ERROR_CODE = '23505';

interface SupabaseRow {
  [key: string]: string | number | boolean | null | object; // Adjust as needed
}

export type SupabaseReplicationOptions<RxDocType> = {
  /**
   * The SupabaseClient to replicate with.
   */
  supabaseClient: SupabaseClient;

  /**
   * The table to replicate to, if different from the name of the collection.
   * @default the name of the RxDB collection.
   */
  table?: string;

  /**
   * The primary key of the supabase table, if different from the primary key of the RxDB.
   * @default the primary key of the RxDB collection
   */
  // TODO: Support composite primary keys.
  primaryKey?: string;

  keyMapping?: Record<string, string>;

  /**
   * Options for pulling data from supabase. Set to {} to pull with the default
   * options, as no data will be pulled if the field is absent.
   */
  pull?: Omit<
    ReplicationPullOptions<RxDocType, SupabaseReplicationCheckpoint>,
    'handler' | 'stream$'
  > & {
    /**
     * Whether to subscribe to realtime Postgres changes for the table. If set to false,
     * only an initial pull will be performed. Only has an effect if the live option is set
     * to true.
     * @default true
     */
    realtimePostgresChanges?: boolean;

    /**
     * The name of the supabase field that is automatically updated to the last
     * modified timestamp by postgres. This field is required for the pull sync
     * to work and can easily be implemented with moddatetime in supabase.
     * @default '_modified'
     */
    lastModifiedField?: string;
  };

  /**
   * Options for pushing data to supabase. Set to {} to push with the default
   * options, as no data will be pushed if the field is absent.
   */
  // TODO: enable custom batch size (currently always one row at a time)
  push?: Omit<ReplicationPushOptions<RxDocType>, 'handler' | 'batchSize'> & {
    /**
     * Handler for pushing row updates to supabase. Must return true iff the UPDATE was
     * applied to the supabase table. Returning false signalises a write conflict, in
     * which case the current state of the row will be fetched from supabase and passed to
     * the RxDB collection's conflict handler.
     * @default the default handler will update the row only iff all fields match the
     * local state (before the update was applied), otherwise the conflict handler is
     * invoked. The default handler does not support JSON fields at the moment.
     */
    // TODO: Support JSON fields
    updateHandler?: (row: RxReplicationWriteToMasterRow<RxDocType>) => Promise<boolean>;
  };
} & Omit<
  // We don't support waitForLeadership. You should just run in a SharedWorker anyways, no?
  ReplicationOptions<RxDocType, unknown>,
  'pull' | 'push' | 'waitForLeadership' | 'collection'
> & {
    collection: RxCollection<RxDocType>;
  };

/**
 * The checkpoint stores until which point the client and supabse have been synced.
 * For this to work, we require each row to have a datetime field that contains the
 * last modified time. In case two rows have the same timestamp, we use the primary
 * key to define a strict order.
 */
export interface SupabaseReplicationCheckpoint {
  modified: string;
  primaryKeyValue: string | number;
}

/**
 * Replicates the local RxDB database with the given Supabase client.
 *
 * See SupabaseReplicationOptions for the various configuration options. For a general introduction
 * to RxDB's replication protocol, see https://rxdb.info/replication.html
 */
export class SupabaseReplication<RxDocType> extends RxReplicationState<
  RxDocType,
  SupabaseReplicationCheckpoint
> {
  private readonly table: string;
  private readonly primaryKey: string;
  private readonly lastModifiedFieldName: string;
  private readonly replicationIdentifierHash: string;
  private readonly keyMapping: Record<string, string>;
  private readonly reverseKeyMapping: Record<string, string>;

  private readonly realtimeChanges: Subject<
    RxReplicationPullStreamItem<RxDocType, SupabaseReplicationCheckpoint>
  >;
  private realtimeChannel?: RealtimeChannel;

  constructor(private options: SupabaseReplicationOptions<RxDocType>) {
    const realtimeChanges = new Subject<
      RxReplicationPullStreamItem<RxDocType, SupabaseReplicationCheckpoint>
    >();

    const replicationIdentifierHash = hash(options.replicationIdentifier);

    super(
      replicationIdentifierHash,
      options.collection,
      options.deletedField ?? DEFAULT_DELETED_FIELD,
      options.pull && {
        ...options.pull,
        stream$: realtimeChanges,
        handler: async (lastCheckpoint, batchSize) => this.pullHandler(lastCheckpoint, batchSize)
      },
      options.push && {
        ...options.push,
        batchSize: 1, // TODO: support batch insertion
        handler: async (rows) => this.pushHandler(rows)
      },
      typeof options.live === 'undefined' ? true : options.live,
      typeof options.retryTime === 'undefined' ? 5000 : options.retryTime,
      typeof options.autoStart === 'undefined' ? true : options.autoStart
    );

    this.realtimeChanges = realtimeChanges;
    this.table = options.table ?? options.collection.name;
    this.replicationIdentifierHash = replicationIdentifierHash;
    this.primaryKey = options.primaryKey ?? options.collection.schema.primaryPath;
    this.lastModifiedFieldName = options.pull?.lastModifiedField ?? DEFAULT_LAST_MODIFIED_FIELD;

    this.keyMapping = options.keyMapping ?? {};
    this.reverseKeyMapping = Object.fromEntries(
      Object.entries(this.keyMapping).map(([k, v]) => [v, k])
    );

    if (this.autoStart) {
      void this.start();
    }
  }

  public override async start(): Promise<void> {
    if (
      this.live &&
      this.options.pull &&
      (this.options.pull.realtimePostgresChanges ??
        typeof this.options.pull.realtimePostgresChanges === 'undefined')
    ) {
      this.watchPostgresChanges();
    }

    return super.start();
  }

  public override async cancel(): Promise<undefined[]> {
    if (this.realtimeChannel) {
      return Promise.all([super.cancel(), this.realtimeChannel.unsubscribe()]);
    }

    return super.cancel();
  }

  /**
   * Pulls all changes since the last checkpoint from supabase.
   */
  private async pullHandler(
    lastCheckpoint: SupabaseReplicationCheckpoint | undefined,
    batchSize: number
  ): Promise<ReplicationPullHandlerResult<RxDocType, SupabaseReplicationCheckpoint>> {
    let query = this.options.supabaseClient.from(this.table).select();

    if (lastCheckpoint?.modified) {
      // Construct the PostgREST query for the following condition:
      // WHERE _modified > lastModified OR (_modified = lastModified AND primaryKey > lastPrimaryKey)
      const lastModified = JSON.stringify(lastCheckpoint.modified);
      const lastPrimaryKey = JSON.stringify(lastCheckpoint.primaryKeyValue); // TODO: Add test for a integer primary key
      const isNewer = `${this.lastModifiedFieldName}.gt.${lastModified}`;
      const isSameAge = `${this.lastModifiedFieldName}.eq.${lastModified}`;
      query = query.or(`${isNewer},and(${isSameAge},${this.primaryKey}.gt.${lastPrimaryKey})`);
    }

    query = query.order(this.lastModifiedFieldName).order(this.primaryKey).limit(batchSize);
    const { data, error } = await query;

    if (error) throw error;

    if (data.length === 0) {
      return {
        checkpoint: lastCheckpoint ?? null,
        documents: []
      };
    }
    return {
      checkpoint: this.rowToCheckpoint(data[data.length - 1]),
      documents: data.map(this.rowToRxDoc.bind(this))
    };
  }

  /**
   * Pushes local changes to supabase.
   */
  private async pushHandler(
    rows: RxReplicationWriteToMasterRow<RxDocType>[]
  ): Promise<WithDeleted<RxDocType>[]> {
    if (rows.length !== 1) throw new Error('Invalid batch size');
    const row = rows[0];
    if (!row) throw new Error('No row to push');

    //console.debug("Pushing changes...", row.newDocumentState)

    return row.assumedMasterState
      ? this.handleUpdate(row)
      : this.handleInsertion(row.newDocumentState);
  }

  /**
   * Tries to insert a new row. Returns the current state of the row in case of a conflict.
   */
  private async handleInsertion(doc: WithDeleted<RxDocType>): Promise<WithDeleted<RxDocType>[]> {
    const { error } = await this.options.supabaseClient
      .from(this.table)
      .insert(this.updateRowKeys(doc));

    if (!error) {
      return []; // Success :)
    }
    if (error.code === POSTGRES_DUPLICATE_KEY_ERROR_CODE) {
      // The row was already inserted. Fetch current state and let conflict handler resolve it.
      const value = doc[this.primaryKey as keyof typeof doc];
      return [await this.fetchByPrimaryKey(value)];
    }
    throw error;
  }

  /**
   * Updates a row in supabase if all fields match the local state. Otherwise, the current
   * state is fetched and passed to the conflict handler.
   */
  private async handleUpdate(
    row: RxReplicationWriteToMasterRow<RxDocType>
  ): Promise<WithDeleted<RxDocType>[]> {
    const updateHandler = this.options.push?.updateHandler ?? this.defaultUpdateHandler.bind(this);
    if (await updateHandler(this.updateRowKeys(row))) return []; // Success :)

    // Fetch current state and let conflict handler resolve it.
    const state = row.newDocumentState;
    const value = state[this.primaryKey as keyof typeof state];
    return [await this.fetchByPrimaryKey(value)];
  }

  /**
   * Updates the row only if all database fields match the expected state.
   */
  private async defaultUpdateHandler(
    row: RxReplicationWriteToMasterRow<RxDocType>
  ): Promise<boolean> {
    let query = this.options.supabaseClient
      .from(this.table)
      .update(this.updateRowKeys(row.newDocumentState), { count: 'exact' });

    if (!row.assumedMasterState) {
      throw new Error('assumedMasterState is null or undefined.');
    }

    Object.entries(this.updateRowKeys(row.assumedMasterState)).forEach(([field, value]) => {
      const type = typeof value;
      if (type === 'string' || type === 'number') {
        query = query.eq(field, value);
      } else if (type === 'boolean' || value === null) {
        query = query.is(field, value);
      } else if (type === 'object') {
        query = query.eq(field, stringifyDeterministic(value));
      } else {
        throw new Error(`replicateSupabase: Unsupported field of type ${type}`);
      }
    });
    const { error, count } = await query;
    if (error) throw error;
    return count === 1;
  }

  private watchPostgresChanges() {
    this.realtimeChannel = this.options.supabaseClient
      .channel(`rxdb-supabase-${this.replicationIdentifierHash}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: this.table }, (payload) => {
        if (payload.eventType === 'DELETE') return; // Should have set _deleted field already
        //console.debug('Realtime event received:', payload)
        this.realtimeChanges.next({
          checkpoint: this.rowToCheckpoint(payload.new),
          documents: [this.rowToRxDoc(payload.new)]
        });
      })
      .subscribe();
  }

  private async fetchByPrimaryKey(primaryKeyValue: unknown): Promise<WithDeleted<RxDocType>> {
    const { data, error } = await this.options.supabaseClient
      .from(this.table)
      .select()
      .eq(this.primaryKey, primaryKeyValue)
      .limit(1);

    if (error) throw error;
    if (data.length !== 1) throw new Error('No row with given primary key');
    return this.rowToRxDoc(data[0]);
  }

  private rowToRxDoc(row: SupabaseRow): WithDeleted<RxDocType> {
    // TODO: Don't delete the field if it is actually part of the collection
    delete row[this.lastModifiedFieldName];
    return this.updateRowKeys(row as WithDeleted<RxDocType>, true);
  }

  private updateRowKeys<T extends GenericObject>(doc: T, revert = false) {
    Object.entries(doc).forEach(([key, value]) => {
      const newKey = revert ? this.reverseKeyMapping[key] ?? key : this.keyMapping[key] ?? key;
      if (newKey === key) return;

      doc[newKey as keyof T] = value;
      delete doc[key];
    });

    return doc;
  }

  private rowToCheckpoint(row: SupabaseRow): SupabaseReplicationCheckpoint {
    return {
      modified: row[this.lastModifiedFieldName],
      primaryKeyValue: row[this.primaryKey]
    };
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
