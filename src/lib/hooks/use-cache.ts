import { G } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { stringifyDeterministic } from '@/lib/utils/json';
import { hash } from '@/lib/utils/string';

export const createCachedHook = <I, O>(processor: (arg: I) => O) => {
  const cachedResults = new Map<string, O>();
  const cachedExecutions = new Map<string, () => O | undefined>();

  return (cacheKey: string, index: I) => {
    const stringified = stringifyDeterministic(index);
    const argsHash = G.isNotNullable(stringified) ? hash(stringified) : '';

    // biome-ignore lint/correctness/useExhaustiveDependencies: Purposefully not exhaustive
    return useCallback(() => {
      cachedExecutions.set(cacheKey, () => {
        if (cachedResults.has(cacheKey)) return cachedResults.get(cacheKey) as O;

        const result = processor(index);
        cachedResults.set(cacheKey, result);
        return result;
      });

      return cachedExecutions.get(cacheKey)?.();
    }, [argsHash]);
  };
};
