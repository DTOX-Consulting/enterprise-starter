import { useState, useCallback, useRef } from 'react';

export function useForceRerender() {
  const [, setTick] = useState(0);

  const forceRerender = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  return forceRerender;
}

export function useForceState<T>(initialValue: T) {
  const stateRef = useRef<T>(initialValue);
  const forceRerender = useForceRerender();

  const setState = useCallback(
    (value: T, rerender?: boolean) => {
      stateRef.current = value;
      rerender && forceRerender();
    },
    [forceRerender]
  );

  return [stateRef.current, setState] as const;
}
