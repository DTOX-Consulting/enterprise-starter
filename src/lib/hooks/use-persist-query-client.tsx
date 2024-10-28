import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useQueryClient } from '@tanstack/react-query';
import {
  removeOldestQuery,
  persistQueryClient,
  type PersistedClient
} from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import { stringify } from 'safe-stable-stringify';

export const usePersistQueryClient = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      throttleTime: 1000,
      retry: removeOldestQuery,
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      storage: window.localStorage,
      serialize: (data) => stringify(data),
      deserialize: (data) => JSON.parse(data) as PersistedClient
    });

    const initPersistence = async () => {
      try {
        await Promise.all([
          persistQueryClient({
            queryClient: queryClient as unknown as Parameters<
              typeof persistQueryClient
            >[0]['queryClient'],
            maxAge: 60 * 60 * 24,
            persister: localStoragePersister
          })
        ]);
      } catch (error) {
        console.error('Failed to persist query client:', error);
      }
    };

    void initPersistence();
  }, [queryClient]);
};

export const PersistQueryClient = () => {
  usePersistQueryClient();
  return null;
};
