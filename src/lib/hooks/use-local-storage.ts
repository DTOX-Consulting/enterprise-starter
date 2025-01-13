import { G } from '@mobily/ts-belt';
import { useState } from 'react';

import { getWindow } from '@/lib/utils/dom';
import { parse, stringify } from '@/lib/utils/json';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const window = getWindow();
    if (!window) return initialValue;

    const item = window.localStorage.getItem(key);
    return G.isNotNullable(item) ? (parse<T>(item) ?? initialValue) : initialValue;
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      const window = getWindow();
      if (!window) return;

      const serialized = stringify(value);
      if (G.isNotNullable(serialized)) {
        window.localStorage.setItem(key, serialized);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
