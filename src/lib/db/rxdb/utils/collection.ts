/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { each } from 'already';

import { schemas, type Schema } from '@/lib/db/rxdb/schemas';
import { isDeepEqual } from '@/lib/utils/deep-equal';

import type { CollectionSchema, CommonProperties } from '@/lib/db/rxdb/utils/schema';
import type { GenericFunction } from '@/lib/utils/function';
import type {
  RxCollection,
  RxCollectionCreator,
  RxConflictHandler,
  RxConflictHandlerInput,
  RxConflictHandlerOutput,
  RxDatabase,
  RxJsonSchema
} from 'rxdb';

export const addCollections = async (db: RxDatabase) => {
  const collections = createCollections(schemas);
  return db.addCollections(collections);
};

const createCollections = (schemas: Schema) => {
  return Object.entries(schemas).reduce(
    (acc, [name, schema]) => {
      acc[name] = {
        schema,
        autoMigrate: false,
        conflictHandler: getConflictHandler(name as keyof Schema),
        migrationStrategies: getMigrationStrategies(name as keyof Schema)
      };
      return acc;
    },
    {} as Record<string, RxCollectionCreator>
  );
};

export const migrateCollections = async (collections: Record<string, RxCollection>) => {
  return each(Object.entries(collections), async ([, coll]) => {
    const needed = await coll.migrationNeeded();
    if (needed) {
      await coll.startMigration(20);
    }
  });
};

type UnwrapRxJsonSchema<T> = T extends RxJsonSchema<infer U>
  ? U extends CollectionSchema<infer V>
    ? V
    : U
  : T;

export const getMigrationStrategies = <
  T extends keyof Schema = keyof Schema,
  S extends Schema[T] = Schema[T],
  V extends UnwrapRxJsonSchema<S> = UnwrapRxJsonSchema<S>
>(
  _name: T
): Record<number, GenericFunction<V, [V]>> | undefined => {
  const _noop = (oldDoc: unknown) => oldDoc as V;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const _getDefaults = (oldDoc: any): Record<keyof CommonProperties, string> => {
    return {
      id: oldDoc.id,
      ownerId: oldDoc.ownerId,
      createdAt: oldDoc.createdAt,
      updatedAt: oldDoc.updatedAt
    };
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const _getMeta = (oldDoc: any, rev: number) => {
    const [_, revId = ''] = (oldDoc._rev as string)?.split('-') ?? [];

    return {
      _meta: oldDoc._meta,
      _rev: `${rev}-${revId}`,
      _deleted: oldDoc._deleted,
      _attachments: oldDoc._attachments
    };
  };

  return {};
};

const getConflictHandler = <
  T extends keyof Schema = keyof Schema,
  S extends Schema[T] = Schema[T],
  V extends UnwrapRxJsonSchema<S> = UnwrapRxJsonSchema<S>
>(
  _name: T
) => {
  const handler: RxConflictHandler<V> = async (
    /**
     * The conflict handler gets 3 input properties:
     * - assumedMasterState: The state of the document that is assumed to be on the master branch
     * - newDocumentState: The new document state of the fork branch (=client) that RxDB want to write to the master
     * - realMasterState: The real master state of the document
     */
    i: RxConflictHandlerInput<V>
  ): Promise<RxConflictHandlerOutput<V>> => {
    /**
     * Here we detect if a conflict exists in the first place.
     * If there is no conflict, we return isEqual=true.
     * If there is a conflict, return isEqual=false.
     * In the default handler we do a deepEqual check,
     * but in your custom conflict handler you probably want
     * to compare specific properties of the document, like the updatedAt time,
     * for better performance because deepEqual() is expensive.
     */
    if (isDeepEqual(i.newDocumentState, i.realMasterState)) {
      return Promise.resolve({
        isEqual: true
      });
    }

    /**
     * If a conflict exists, we have to resolve it.
     * The default conflict handler will always
     * drop the fork state and use the master state instead.
     *
     * In your custom conflict handler you likely want to merge properties
     * of the realMasterState and the newDocumentState instead.
     */
    return Promise.resolve({
      isEqual: false,
      documentData: i.realMasterState
    });
  };

  return handler;
};

/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
