/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RxReplicationState } from 'rxdb/plugins/replication';
import { Subject } from 'rxjs';
import { stringify } from 'safe-stable-stringify';

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

// const DEFAULT_REV_FIELD = '_rev';
const DEFAULT_DELETED_FIELD = '_deleted';
const DEFAULT_LAST_MODIFIED_FIELD = '_modified';
const POSTGRES_DUPLICATE_KEY_ERROR_CODE = '23505';

export type SupabaseReplicationOptions<RxDocType> = {
  /**
   * The SupabaseClient to replicate with.
   */
  supabaseClient: SupabaseClient;

  /**
   * The table to replicate to, if different from the name of the collection.
   *
   * @default the name of the RxDB collection.
   */
  table?: string;

  /**
   * The primary key of the supabase table, if different from the primary key of the RxDB.
   *
   * @default the primary key of the RxDB collection
   */
  primaryKey?: string;

  /**
   * This allows you to map the keys of the RxDB collection to the column names of the supabase table.
   */
  keyMapping?: Record<string, string>;

  /**
   * This allows you to limit the replication to a subset of the data. The key is the field to filter on,
   * and the value is the value to filter for.
   * i.e. { key: 'ownerid', value: '123' } would only replicate data where the ownerid field is '123'.
   */
  filter?: {
    key: string;
    value: string;
  };

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
     *
     * @default true
     */
    realtimePostgresChanges?: boolean;

    /**
     * The name of the supabase field that is automatically updated to the last
     * modified timestamp by postgres. This field is required for the pull sync
     * to work and can easily be implemented with moddatetime in supabase.
     *
     * @default '_modified'
     */
    lastModifiedField?: string;
  };

  /**
   * Options for pushing data to supabase. Set to {} to push with the default
   * options, as no data will be pushed if the field is absent.
   */
  push?: Omit<ReplicationPushOptions<RxDocType>, 'handler' | 'batchSize'> & {
    /**
     * Handler for pushing row updates to supabase. Must return true iff the UPDATE was
     * applied to the supabase table. Returning false signalises a write conflict, in
     * which case the current state of the row will be fetched from supabase and passed to
     * the RxDB collection's conflict handler.
     *
     * @default the default handler will update the row only iff all fields match the
     * local state (before the update was applied), otherwise the conflict handler is
     * invoked. The default handler supports JSON fields.
     */
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
export type SupabaseReplicationCheckpoint = {
  modified: string;
  primaryKeyValue: string | number;
};

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
        batchSize: 1,
        handler: async (rows) => this.pushHandler(rows)
      },
      options.live ?? true,
      options.retryTime ?? 5000,
      options.autoStart ?? true
    );

    this.realtimeChanges = realtimeChanges;
    this.table = options.table ?? options.collection.name;
    this.replicationIdentifierHash = replicationIdentifierHash;
    this.primaryKey = options.primaryKey ?? options.collection.schema.primaryPath;
    this.lastModifiedFieldName = options.pull?.lastModifiedField ?? DEFAULT_LAST_MODIFIED_FIELD;

    this.keyMapping = options.keyMapping ?? {};
    this.reverseKeyMapping = Object.fromEntries(
      Object.entries(this.keyMapping).map(([key, value]) => [value, key])
    );

    if (this.autoStart) {
      void this.start();
    }
  }

  public override async start(): Promise<void> {
    if (Boolean(this.live) && Boolean(this.options.pull?.realtimePostgresChanges)) {
      this.watchPostgresChanges();
    }

    return super.start();
  }

  public override async cancel(): Promise<unknown> {
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
      const lastModified = stringify(lastCheckpoint.modified);
      const lastPrimaryKey = stringify(lastCheckpoint.primaryKeyValue);
      const isNewer = `${this.lastModifiedFieldName}.gt.${lastModified}`;
      const isSameAge = `${this.lastModifiedFieldName}.eq.${lastModified}`;
      query = query.or(`${isNewer},and(${isSameAge},${this.primaryKey}.gt.${lastPrimaryKey})`);
    }

    query = this.options.filter
      ? query.eq(this.options.filter.key, this.options.filter.value)
      : query;

    query = query.order(this.lastModifiedFieldName).order(this.primaryKey).limit(batchSize);

    const { data, error } = await query;

    if (error) throw new Error(`Error pulling data from supabase: ${error.message}`);

    if (data.length === 0) {
      return {
        checkpoint: lastCheckpoint ?? null,
        documents: []
      };
    }
    return {
      checkpoint: this.rowToCheckpoint(data[data.length - 1] as GenericObject),
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
    const [row] = rows;
    if (!row) throw new Error('No row to push');

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
    throw new Error(`Error inserting row: ${error.message}`);
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

    const state = (row.assumedMasterState ?? row.newDocumentState) as GenericObject;

    const toTest = {
      id: state.id,
      ownerId: state.ownerId ?? state.ownerid,
      createdAt: state.createdAt ?? state.createdat,
      updatedAt: state.updatedAt ?? state.updatedat
    };

    console.log('[SUPABASE REPLICATION] Updating row:', { state, toTest });

    Object.entries(this.updateRowKeys(toTest ?? state)).forEach(([field, value]) => {
      const type = typeof value;

      if (type === 'undefined' || value === null) {
        query = query.is(field, null);
      } else if (type === 'string' || type === 'number') {
        query = query.eq(field, value);
      } else if (type === 'boolean') {
        query = query.is(field, value);
      } else if (type === 'object') {
        query = query.eq(field, stringifyDeterministic(value));
      } else {
        console.error(
          '[SUPABASE REPLICATION] Error updating row',
          { row, state, toTest },
          { field, value, type }
        );
        throw new Error(`replicateSupabase: Unsupported field of type ${type}`);
      }
    });

    const { error, count } = await query;
    console.log('[SUPABASE REPLICATION] Update result', { success: count === 1, error });

    if (error) throw new Error(`Error updating row: ${error.message}`);
    return count === 1;
  }

  private watchPostgresChanges() {
    this.realtimeChannel = this.options.supabaseClient
      .channel(`rxdb-supabase-${this.replicationIdentifierHash}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: this.table }, (payload) => {
        if (payload.eventType === 'DELETE' || payload.new == null) return;
        try {
          this.realtimeChanges.next({
            documents: [this.rowToRxDoc(payload.new)],
            checkpoint: this.rowToCheckpoint(payload.new)
          });
        } catch (err) {
          console.error('Error processing realtime event:', err);
        }
      })
      .subscribe();
  }

  private async fetchByPrimaryKey(primaryKeyValue: unknown): Promise<WithDeleted<RxDocType>> {
    const { data, error } = await this.options.supabaseClient
      .from(this.table)
      .select()
      .eq(this.primaryKey, primaryKeyValue)
      .limit(1);

    if (error) throw new Error(`Error fetching row by primary key: ${error.message}`);
    if (data.length !== 1) throw new Error('No row with given primary key');
    return this.rowToRxDoc(data[0] as GenericObject);
  }

  private rowToRxDoc(row: GenericObject): WithDeleted<RxDocType> {
    const { [this.lastModifiedFieldName]: _, ...rest } = row;
    return this.updateRowKeys(rest as WithDeleted<RxDocType>, true);
  }

  private updateRowKeys<T extends GenericObject>(doc: T, revert = false) {
    Object.entries(doc).forEach(([key, value]) => {
      const newKey = revert ? (this.reverseKeyMapping[key] ?? key) : (this.keyMapping[key] ?? key);
      if (newKey === key) return;

      doc[newKey as keyof T] = value;
      delete doc[key];
    });

    return doc;
  }

  private rowToCheckpoint(row: GenericObject): SupabaseReplicationCheckpoint {
    return {
      modified: row[this.lastModifiedFieldName],
      primaryKeyValue: row[this.primaryKey]
    };
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
