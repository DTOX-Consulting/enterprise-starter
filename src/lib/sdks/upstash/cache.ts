import { G } from '@mobily/ts-belt';

import { redis } from '@/lib/sdks/upstash/clients/redis';
import { parse, stringify } from '@/lib/utils/json';

type CacheOptions = {
  ttlSeconds?: number;
  keyPrefix?: string;
};

export function withCache<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: CacheOptions = {}
): (...args: TArgs) => Promise<TReturn> {
  const { ttlSeconds = 3600, keyPrefix = fn.name || 'cached' } = options;

  return async (...args: TArgs) => {
    const key = `${keyPrefix}:${stringify(args)}`;

    const cachedStr = await redis.get(key);
    const cached = typeof cachedStr === 'string' ? parse<TReturn>(cachedStr) : null;

    if (G.isNotNullable(cached)) {
      return cached;
    }

    const result = await fn(...args);
    await redis.set(key, result, { ex: ttlSeconds });
    return result;
  };
}

export function invalidateCache<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: CacheOptions = {}
): (...args: TArgs) => Promise<TReturn> {
  const { keyPrefix = fn.name || 'cached' } = options;

  return async (...args: TArgs) => {
    const key = `${keyPrefix}:${stringify(args)}`;
    await redis.del(key);
    return fn(...args);
  };
}
