import { G } from '@mobily/ts-belt';
import { useEffect, useState } from 'react';

import { stringify } from '@/lib/utils/stringify';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const item = window.localStorage.getItem(key);
    setStoredValue(G.isNotNullable(item) ? (JSON.parse(item) as T) : (undefined as T));
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    window.localStorage.setItem(key, stringify(value) as unknown as string);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
