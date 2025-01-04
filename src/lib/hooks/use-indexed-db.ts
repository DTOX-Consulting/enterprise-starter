import { useCallback, useEffect, useState } from 'react';

import { IndexedDBStore } from '@/lib/db/indexeddb/storage';

type UseIndexedDBConfig = {
  dbName: string;
  version: number;
  storeName: string;
};

const useIndexedDB = <T>(
  key: string,
  initialValue: T,
  config: UseIndexedDBConfig
): [T, (value: T) => Promise<void>, boolean] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [store] = useState(() => new IndexedDBStore(config));

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
        const result = await store.setItem(key, value);
        if (result.success) {
          setStoredValue(value);
        } else {
          console.error('Failed to save value to IndexedDB:', result.error);
        }
      } catch (error) {
        console.error('Failed to save value to IndexedDB:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [key, store]
  );

  return [storedValue, setValue, isLoading];
};

export default useIndexedDB;
