import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
  persistQueryClient,
  removeOldestQuery,
  type PersistedClient
} from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import { stringify } from 'safe-stable-stringify';

export const usePersistQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24 // 24 hours
      }
    }
  });

  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      throttleTime: 1000,
      retry: removeOldestQuery,
      // eslint-disable-next-line n/no-unsupported-features/node-builtins
      storage: window.localStorage,
      serialize: (data) => stringify(data),
      deserialize: (data) => JSON.parse(data) as PersistedClient
    });

    const initPersistence = () => {
      try {
        // eslint-disable-next-line sonarjs/void-use
        void persistQueryClient({
          queryClient: queryClient as unknown as Parameters<
            typeof persistQueryClient
          >[0]['queryClient'],
          persister: localStoragePersister,
          maxAge: 1000 * 60 * 60 * 24
        });
      } catch (error) {
        console.error('Failed to persist query client:', error);
      }
    };

    initPersistence();
  }, [queryClient]);
};

export const PersistQueryClient = () => {
  usePersistQueryClient();
  return null;
};
