import { useCallback, useEffect, useState } from 'react';

import { IndexedDBStore } from '@/lib/db/indexeddb/storage';

export type UseIndexedDBConfig = {
  dbName: string;
  version: number;
  storeName: string;
};

const useIndexedDB = <T extends string = string>(
  key: string,
  initialValue: T,
  config: UseIndexedDBConfig
): [T, (value: T) => Promise<void>, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [store] = useState(() => new IndexedDBStore(config));
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const result = await store.getItem<T>(key);
        if (result.success && result.data !== undefined) {
          setStoredValue(result.data);
        }
      } catch (error) {
        console.error('Failed to load value from IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadValue();
  }, [key, store]);

  const setValue = useCallback(
    async (value: T) => {
      if (isLoading) return;
      const prevValue = storedValue;

      try {
        setIsLoading(true);
        setStoredValue(value);

        const result = await store.setItem(key, value);
        if (!result.success) {
          console.error('Failed to save value to IndexedDB:', result.error);
          // Revert on failure
          setStoredValue(prevValue);
        }
      } catch (error) {
        console.error('Failed to save value to IndexedDB:', error);
        // Revert on error
        setStoredValue(prevValue);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, key, store, storedValue]
  );

  return [storedValue, setValue, isLoading];
};

export default useIndexedDB;
