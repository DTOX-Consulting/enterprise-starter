import { useState } from 'react';
import isEqual from 'react-fast-compare';

export function useMemoCompare<T>(factory: () => T): T {
  const factoryValue = factory();
  const [value, setValue] = useState<T>(() => factoryValue);

  if (!isEqual(value, factoryValue)) {
    setValue(factoryValue);
  }

  return value;
}
