import { G } from '@mobily/ts-belt';
import { useState, useCallback, useRef } from 'react';

export function useForceRerender() {
  const [, setTick] = useState(0);

  return useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
}

export function useForceState<T>(initialValue: T) {
  const stateRef = useRef<T>(initialValue);
  const forceRerender = useForceRerender();

  const getState = useCallback(() => stateRef.current, []);

  const setState = useCallback(
    (value: T | ((prev: T) => T), rerender?: boolean) => {
      stateRef.current = G.isFunction(value) ? value(stateRef.current) : value;
      if (rerender) forceRerender();
    },
    [forceRerender]
  );

  return [stateRef.current, setState, getState, stateRef] as const;
}
