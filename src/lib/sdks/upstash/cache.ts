import { redis } from '@/lib/sdks/upstash/clients/redis';
import { stringify } from '@/lib/utils/stringify';

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

    const cached = await redis.get<TReturn>(key);
    if (cached !== null) {
      return cached;
    }

    const result = await fn(...args);
    await redis.setex(key, ttlSeconds, result);

    return result;
  };
}
