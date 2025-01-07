import { useCallback, useEffect } from 'react';

export const useAsyncEffect = <V = unknown>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  destroy?: ((result?: V) => void) | readonly unknown[],
  inputs?: readonly unknown[]
) => {
  // Handle overloaded parameters
  const deps = inputs ?? (Array.isArray(destroy) ? destroy : undefined) ?? [];
  const cleanup = typeof destroy === 'function' ? destroy : undefined;

  const effectFn = useCallback(effect, deps);

  useEffect(() => {
    let result: V | undefined;
    let mounted = true;

    const maybePromise = effectFn(() => mounted);

    const runEffect = async () => {
      try {
        result = await Promise.resolve(maybePromise);
      } catch (error) {
        // Handle or swallow errors when component is unmounted
        console.error('Error in useAsyncEffect', error);
      }
    };
    void runEffect();

    return () => {
      mounted = false;
      cleanup?.(result);
    };
  }, [cleanup, effectFn, ...deps]);
};
