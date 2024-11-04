'use client';

import { delay } from 'already';
import { useCallback, useEffect, useState } from 'react';
import {
  useRxData,
  useRxCollection,
  type QueryConstructor,
  type RxQueryResultDoc,
  type UseRxQueryOptions
} from 'rxdb-hooks';

import { clearDbs } from '@/lib/db/indexeddb/utils';
import { initialize, type InitializedDB } from '@/lib/db/rxdb/setup';
import {
  type NCS,
  type PNCS,
  type PDCSI,
  mergeData,
  addCommonProperties
} from '@/lib/db/rxdb/utils/schema';
import { isDev } from '@/lib/env/env.mjs';
import { useAuth } from '@/lib/hooks/use-auth';
import { useDebounceCallback } from '@/lib/hooks/use-debounce';
import { useNavigatorOnline } from '@/lib/hooks/use-navigator-online';
import { useAtom } from '@/lib/state/atoms';
import { danglingPromise } from '@/lib/utils/promise';

import type { SchemaType, SchemaName } from '@/lib/db/rxdb/schemas';

const devLog = isDev()
  ? (...args: unknown[]) => console.info('[RXDB]', ...args)
  : () => {
      /* noop */
    };

export const useRxDB = () => {
  const { session } = useAuth();
  const [, setDbi] = useAtom('dbInitializedAtom');
  const { previous, isOnline } = useNavigatorOnline();
  const [db, setDb] = useState<InitializedDB['db']>();
  const [replicates, setReplicates] = useState<InitializedDB['replication']>();

  const getDb = useCallback(() => db, [db]);
  const getReplicates = useCallback(() => replicates, [replicates]);

  const getDbOrThrow = useCallback(() => {
    const database = getDb();
    if (database) return database;
    throw new Error('DB not initialized');
  }, [getDb]);

  const getReplicatesOrThrow = useCallback(() => {
    const replication = getReplicates();
    if (replication) return replication;
    throw new Error('Replication not initialized');
  }, [getReplicates]);

  const resyncDb = useCallback(
    (forceResync = false) => {
      if (!isOnline) {
        devLog('Stopping resync', { isOnline });
        const replicatesLocal = getReplicatesOrThrow();
        Object.values(replicatesLocal).forEach((replicate) => void replicate.cancel());
        return;
      }

      if (forceResync || (previous !== isOnline && Boolean(isOnline))) {
        devLog('Resyncing DB', { isOnline });
        const replicatesLocal = getReplicatesOrThrow();
        Object.values(replicatesLocal).forEach((replicate) => replicate.reSync());
      }
    },
    [previous, isOnline, getReplicatesOrThrow]
  );

  const destroyDb = useCallback(async () => {
    const dbLocal = getDbOrThrow();
    await dbLocal.remove();
    await dbLocal.destroy();

    setDb(undefined);
    setReplicates(undefined);
  }, [getDbOrThrow]);

  const initializeDb = useDebounceCallback<boolean>(
    'initialize-db',
    async (forceResync = false) => {
      if (session?.user.id === undefined) return;
      if (getDb() && getReplicates()) {
        resyncDb(forceResync);
        return;
      }
      if (getDb() !== undefined || getReplicates() !== undefined) {
        devLog('DB already initialized', getDb());
        return;
      }

      const { db: dbInitialized, replication } = await initialize(session);

      setDb(dbInitialized);
      setReplicates(replication);
      devLog('DB initialized', dbInitialized);

      danglingPromise(
        (async () => {
          await delay(250);
          setDbi(true);
        })()
      );
    },
    [session, getDb, setDbi, getReplicates, resyncDb],
    0
  );

  const reinitializeDb = useCallback(async () => {
    if (session?.user.id === undefined) return;
    await clearDbs();
    await destroyDb();
    initializeDb(true);
  }, [session, destroyDb, initializeDb]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only want this to change when session changes
  useEffect(() => initializeDb(), [session]);
  return { getDb, getDbOrThrow, destroyDb, reinitializeDb, resyncDb };
};

export const useRxDBCollection = <T extends SchemaName, U extends SchemaType<T> = SchemaType<T>>(
  collectionName: T
) => {
  const { user } = useAuth();
  const collectionHook = useRxCollection<U>(collectionName);
  const ownerId = user?.id;

  const getCollection = useCallback(() => collectionHook, [collectionHook]);

  const getCollectionOrThrow = useCallback(() => {
    const collection = getCollection();
    if (collection) return collection;
    throw new Error(`Collection "${collectionName}" not found`);
  }, [getCollection, collectionName]);

  const retrieve = useCallback(
    async (id: string) => getCollectionOrThrow().findOne(id).exec(),
    [getCollectionOrThrow]
  );

  const remove = useCallback(
    async (id: string) => getCollectionOrThrow().findOne(id).incrementalRemove(),
    [getCollectionOrThrow]
  );

  const insert = useCallback(
    async (data: NCS<U>) => getCollectionOrThrow().insert(addCommonProperties({ ownerId, data })),
    [getCollectionOrThrow, ownerId]
  );

  const upsert = useCallback(
    async (data: PNCS<U> | PDCSI<U>) =>
      getCollectionOrThrow().upsert(
        addCommonProperties({ id: data.id as string | undefined, ownerId, data })
      ),
    [getCollectionOrThrow, ownerId]
  );

  const patch = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow()
        .findOne(id)
        .incrementalPatch(addCommonProperties({ id, ownerId, data })),
    [getCollectionOrThrow, ownerId]
  );

  const update = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow()
        .findOne(id)
        .update({
          $set: {
            ...addCommonProperties({ id, ownerId, data })
          }
        }),
    [getCollectionOrThrow, ownerId]
  );

  const modify = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow()
        .findOne(id)
        .incrementalModify((oldData) => mergeData(oldData, data) as U),
    [getCollectionOrThrow]
  );

  return { retrieve, insert, upsert, update, modify, remove, patch };
};

export const useRxDBData = <T extends SchemaName, U extends SchemaType<T> = SchemaType<T>>(
  collectionName: T,
  queryConstructor: QueryConstructor<U>,
  options?: UseRxQueryOptions & { json: false }
): RxQueryResultDoc<U> => useRxData<U>(collectionName, queryConstructor, options);
