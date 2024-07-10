'use client';

import { useNavigatorOnline } from '@oieduardorabelo/use-navigator-online';
import { useCallback, useEffect, useState } from 'react';
import {
  useRxCollection,
  useRxData,
  type QueryConstructor,
  type RxQueryResultDoc,
  type UseRxQueryOptions
} from 'rxdb-hooks';

import { initialize, type InitializedDB } from '@/lib/db/rxdb/setup';
import { mergeData } from '@/lib/db/rxdb/utils/schema';
import { addCommonProperties, type PNCS, type NCS, type PNCSI } from '@/lib/db/rxdb/utils/schema';
import { isDev } from '@/lib/env/env.mjs';
import { useAuth } from '@/lib/hooks/use-auth';
import { danglingPromise } from '@/lib/utils/promise';

import type { SchemaType, SchemaName } from '@/lib/db/rxdb/schemas';

const devLog = isDev()
  ? (...args: any[]) => console.info('[RXDB]', ...(args as unknown[]))
  : () => {
      /* noop */
    };

export const useRxDB = () => {
  const { user } = useAuth();
  const [db, setDb] = useState<InitializedDB['db']>();
  const [replicates, setReplicates] = useState<InitializedDB['replication']>();

  const getDb = useCallback(() => db, [db]);
  const getReplicates = useCallback(() => replicates, [replicates]);

  const getDbOrThrow = useCallback(() => {
    const db = getDb();
    if (db) return db;
    throw new Error('DB not initialized');
  }, [getDb]);

  const getReplicatesOrThrow = useCallback(() => {
    const replicates = getReplicates();
    if (replicates) return replicates;
    throw new Error('Replicates not initialized');
  }, [getReplicates]);

  const resyncDb = useCallback(() => {
    devLog('Resyncing DB');
    const replicates = getReplicatesOrThrow();
    Object.values(replicates).forEach((replicate) => replicate.reSync());
  }, [getReplicatesOrThrow]);

  const destroyDb = useCallback(async () => {
    const db = getDbOrThrow();
    await db.remove();
    await db.destroy();

    setDb(undefined);
    setReplicates(undefined);
  }, [getDbOrThrow]);

  const initializeDb = useCallback(async () => {
    if (getDb() && getReplicates()) return resyncDb();
    if (!user?.id || (getDb() ?? getReplicates())) return;
    const { db, replication } = await initialize(user.id);

    setDb(db);
    setReplicates(replication);
    devLog('DB initialized', db);
  }, [user, getDb, getReplicates, resyncDb]);

  const reinitializeDb = useCallback(async () => {
    if (!user?.id) return;
    await destroyDb();
    await initializeDb();
  }, [user, destroyDb, initializeDb]);

  const { isOnline } = useNavigatorOnline({ startOnline: false });
  devLog('App is Online:', isOnline);

  useEffect(() => danglingPromise(initializeDb()), [user, isOnline, initializeDb]);
  return { getDb, getDbOrThrow, destroyDb, reinitializeDb, resyncDb };
};

export const useRxDBCollection = <T extends SchemaName, U extends SchemaType<T> = SchemaType<T>>(
  collectionName: T
) => {
  const collection = useRxCollection<U>(collectionName);

  const getCollection = useCallback(() => collection, [collection]);

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
    async (id: string) => getCollectionOrThrow().findOne(id).remove(),
    [getCollectionOrThrow]
  );

  const insert = useCallback(
    async (data: NCS<U>) => getCollectionOrThrow().insert(addCommonProperties(data)),
    [getCollectionOrThrow]
  );

  const upsert = useCallback(
    async (data: PNCSI<U>) => getCollectionOrThrow().upsert(addCommonProperties(data)),
    [getCollectionOrThrow]
  );

  const patch = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow().findOne(id).patch(addCommonProperties(data)),
    [getCollectionOrThrow]
  );

  const update = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow()
        .findOne(id)
        .update({
          $set: {
            ...addCommonProperties(data)
          }
        }),
    [getCollectionOrThrow]
  );

  const modify = useCallback(
    async (id: string, data: PNCS<U>) =>
      getCollectionOrThrow()
        .findOne(id)
        .modify((oldData) => mergeData(oldData, data) as U),
    [getCollectionOrThrow]
  );

  return { retrieve, insert, upsert, update, modify, remove, patch };
};

export const useRxDBData = <T extends SchemaName, U extends SchemaType<T> = SchemaType<T>>(
  collectionName: T,
  queryConstructor: QueryConstructor<U>,
  options?: UseRxQueryOptions & { json: false }
): RxQueryResultDoc<U> => {
  return useRxData<U>(collectionName, queryConstructor, options);
};
