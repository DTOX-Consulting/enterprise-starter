import { G } from '@mobily/ts-belt';
import { useEffect, useState } from 'react';
import { stringify } from 'safe-stable-stringify';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    // Retrieve from localStorage
    const item = window.sessionStorage.getItem(key);
    if (G.isNotNullable(item)) {
      setStoredValue(JSON.parse(item) as T);
    }
  }, [key]);

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value);
    // Save to localStorage
    window.sessionStorage.setItem(key, stringify(value as string));
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
