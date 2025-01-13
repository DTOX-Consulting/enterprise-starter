import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
  persistQueryClient,
  removeOldestQuery,
  type PersistedClient
} from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';

import { getWindow } from '@/lib/utils/dom';
import { parse, stringify } from '@/lib/utils/json';

export const usePersistQueryClient = () => {
  const window = getWindow();
  if (!window) return;

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
      storage: window.localStorage,
      serialize: (data) => stringify(data),
      deserialize: (data) => parse<PersistedClient>(data) ?? ({} as PersistedClient)
    });

    // eslint-disable-next-line sonarjs/void-use
    void persistQueryClient({
      queryClient: queryClient as unknown as Parameters<
        typeof persistQueryClient
      >[0]['queryClient'],
      persister: localStoragePersister,
      maxAge: 1000 * 60 * 60 * 24
    });
  }, [queryClient, window.localStorage]);
};

export const PersistQueryClient = () => {
  usePersistQueryClient();
  return null;
};
