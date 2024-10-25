import { G } from '@mobily/ts-belt';
import { useEffect, useState } from 'react';
import { stringify } from 'safe-stable-stringify';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    const item = window.localStorage.getItem(key);
    if (G.isNotNullable(item)) {
      setStoredValue(JSON.parse(item) as T);
    }
  }, [key]);

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // eslint-disable-next-line n/no-unsupported-features/node-builtins
    window.localStorage.setItem(key, stringify(value as string));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
