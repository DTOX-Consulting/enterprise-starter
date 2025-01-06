import { useCallback, useEffect, useState } from 'react';

import { IndexedDBStore } from '@/lib/db/indexeddb/storage';

type UseIndexedDBConfig = {
  dbName: string;
  version: number;
  storeName: string;
};

const useIndexedDB = <T extends string | File = string>(
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
      try {
        setIsLoading(true);
        setStoredValue(value);

        const result = await store.setItem(key, value);
        if (!result.success) {
          console.error('Failed to save value to IndexedDB:', result.error);
          // Revert on failure
          setStoredValue(storedValue);
        }
      } catch (error) {
        console.error('Failed to save value to IndexedDB:', error);
        // Revert on error
        setStoredValue(storedValue);
      } finally {
        setIsLoading(false);
      }
    },
    [key, store, storedValue]
  );

  return [storedValue, setValue, isLoading];
};

export default useIndexedDB;
