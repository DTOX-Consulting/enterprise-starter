import { useCallback, useEffect, useState } from 'react';

import { useForceRerender } from '@/lib/hooks/use-force-rerender';
import { nanoid } from '@/lib/utils/id';
import { danglingPromise } from '@/lib/utils/promise';

const defaultTimeout = 250;
const debounceMap = new Map<string, Timer>();

export function debounce(id: string, fn: () => void | Promise<void>, timeout = defaultTimeout) {
  const existingTimer = debounceMap.get(id);
  existingTimer && clearTimeout(existingTimer);

  const timer = setTimeout(() => {
    danglingPromise(Promise.resolve(fn()));
    debounceMap.delete(id);
    clearTimeout(timer);
  }, timeout);
  debounceMap.set(id, timer);

  return timer;
}

export function useDebounceEffect(key: string, fn: () => void, deps: unknown[], delay?: number) {
  const cb = useCallback(fn, deps);

  useEffect(() => {
    const timer = debounce(key, cb, delay);
    return () => clearTimeout(timer);
  }, [cb, key, delay, ...deps]);
}

export function useDebounceRerender(key: string) {
  const rerender = useForceRerender();
  let timer: Timer | undefined = undefined;
  useEffect(() => () => clearTimeout(timer), [timer]);

  return useCallback(
    // biome-ignore lint/suspicious/noAssignInExpressions: pretty
    (delay?: number) => (timer = debounce(key, rerender, delay)),
    [key, timer, rerender]
  );
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useDebounceEffect(`use-debounce-${nanoid()}`, () => setDebouncedValue(value), [value], delay);
  return debouncedValue;
}

export function useDebounceCallback<
  A,
  F extends (...args: A[]) => void | Promise<void> = (...args: A[]) => void | Promise<void>
>(key: string, callback: F, deps: unknown[] = [], delay?: number) {
  return useCallback(
    (...args: A[]) => {
      // eslint-disable-next-line promise/prefer-await-to-callbacks
      const timer = debounce(key, async () => callback(...args), delay);
      return () => clearTimeout(timer);
    },
    [key, delay, callback, ...deps]
  );
}
