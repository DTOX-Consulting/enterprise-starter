'use client';

import { atom, useAtom, type PrimitiveAtom } from 'jotai';

import { useAuth } from '@/lib/hooks/use-auth';
import useIndexedDB, { type UseIndexedDBConfig } from '@/lib/hooks/use-indexed-db';
import useR2DB, { type UseR2DBConfig } from '@/lib/hooks/use-r2-db';
import useRedisDB, { type UseRedisDBConfig } from '@/lib/hooks/use-redis-db';

export type DB_TYPE = 'idb' | 'r2' | 'redis';

export type StorageConfig<T extends DB_TYPE> = T extends 'idb'
  ? UseIndexedDBConfig
  : T extends 'r2'
    ? UseR2DBConfig
    : T extends 'redis'
      ? UseRedisDBConfig
      : never;

type StorageHook<T extends DB_TYPE> = T extends 'idb'
  ? typeof useIndexedDB
  : T extends 'r2'
    ? typeof useR2DB
    : T extends 'redis'
      ? typeof useRedisDB
      : never;

type SCI = UseIndexedDBConfig & UseR2DBConfig & UseRedisDBConfig;

type StorageResult<T, K extends DB_TYPE> = {
  hook: StorageHook<K>;
  storageConfig: StorageConfig<K>;
  atomValues: T[];
  setAtomValues: (value: T[]) => void;
};

// Create a map to store atoms for different data types
const atomsMap = new Map<string, PrimitiveAtom<unknown[]>>();

function getOrCreateAtom<T>(key: string, initialValue: T[]): PrimitiveAtom<T[]> {
  const existingAtom = atomsMap.get(key);
  if (existingAtom) {
    return existingAtom as PrimitiveAtom<T[]>;
  }
  const newAtom = atom<T[]>(initialValue);
  atomsMap.set(key, newAtom as PrimitiveAtom<unknown[]>);
  return newAtom;
}

function getStorageConfig<T, K extends DB_TYPE>(
  type: K,
  config: StorageConfig<K>,
  atomValues: T[],
  setAtomValues: (value: T[]) => void
): StorageResult<T, K> {
  return {
    atomValues,
    setAtomValues,
    storageConfig: config,
    hook: {
      r2: useR2DB,
      redis: useRedisDB,
      idb: useIndexedDB
    }[type] as StorageHook<K>
  };
}

export function useStorage<T, K extends DB_TYPE>(
  type: K,
  storageKeyPrefix: string,
  config: StorageConfig<K>
) {
  const { getStorageKey, isAuthenticated } = useAuth();
  const storageKey = getStorageKey(storageKeyPrefix);

  // Create atom only for the specified storage type
  const storageAtom = getOrCreateAtom<T>(`${storageKey}-${type}`, []);
  const [atomValues, setAtomValues] = useAtom(storageAtom);

  const { storageConfig, hook } = getStorageConfig(type, config, atomValues, setAtomValues);
  const [rawValues, setValues, isLoading] = hook(storageKey, '[]' as string, storageConfig as SCI);

  const isReady = !isLoading && isAuthenticated;
  const isNotReady = isLoading || !isAuthenticated;

  return {
    rawValues,
    setValues,
    atomValues,
    setAtomValues,
    /* pass through for the component */
    isReady,
    isLoading,
    isNotReady,
    storageKey,
    isAuthenticated
  };
}
