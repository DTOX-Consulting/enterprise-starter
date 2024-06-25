import { useEffect, useState } from 'react';

import { useForceRerender } from '@/lib/hooks/use-force-rerender';
import { nanoid } from '@/lib/utils/id';
import { danglingPromise } from '@/lib/utils/promise';

const defaultTimeout = 250;
const debounceMap = new Map<string, Timer>();

export function debounce(id: string, fn: () => void | Promise<void>, timeout = defaultTimeout) {
  const existingTimer = debounceMap.get(id);
  existingTimer && clearTimeout(existingTimer);

  const timer = setTimeout(() => danglingPromise(Promise.resolve(fn())), timeout);
  debounceMap.set(id, timer);

  return timer;
}

export function useDebounceEffect(key: string, fn: () => void, deps: unknown[], delay?: number) {
  useEffect(() => {
    const timer = debounce(key, fn, delay);
    return () => clearTimeout(timer);
  }, [key, fn, delay, ...deps]);
}

export function useDebounceRerender(key: string) {
  const rerender = useForceRerender();
  let timer: Timer | undefined = undefined;
  useEffect(() => () => clearTimeout(timer), [timer]);

  return (delay?: number) => {
    timer = debounce(key, rerender, delay);
  };
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useDebounceEffect(`use-debounce-${nanoid()}`, () => setDebouncedValue(value), [value], delay);
  return debouncedValue;
}
