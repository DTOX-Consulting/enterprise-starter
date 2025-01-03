import { G } from '@mobily/ts-belt';

import { redis } from '@/lib/sdks/upstash/clients/redis';
import { stringify } from '@/lib/utils/stringify';
import { protectedProcedure, publicProcedure } from '@/trpc';

import type { ProcedureBuilder } from '@trpc/server';

type CacheOptions = {
  keyPrefix?: string;
  ttlSeconds?: number;
  enabled?: boolean | ((input: unknown) => boolean);
  getKey?: (path: string, input: unknown) => string;
};

const defaultOptions: CacheOptions = {
  enabled: true,
  keyPrefix: 'trpc',
  ttlSeconds: 60 * 5, // 5 minutes
  getKey: (path, input) => `${path}:${stringify(input)}`
};

/**
 * Creates a cached procedure that will cache the results of the query
 * based on the input parameters and procedure path
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const createCachedProcedure = <T extends ProcedureBuilder<any>>(
  procedure: T,
  options: CacheOptions = {}
) => {
  const opts = { ...defaultOptions, ...options } as CacheOptions & {
    getKey: (path: string, input: unknown) => string;
  };

  return procedure.use(async ({ path, rawInput, next }) => {
    // Check if caching is enabled
    const isEnabled = typeof opts.enabled === 'function' ? opts.enabled(rawInput) : opts.enabled;

    if (G.isNullable(isEnabled) || !isEnabled) {
      return next();
    }

    // Generate cache key
    const cacheKey = `${opts.keyPrefix}:${opts.getKey(path, rawInput)}`;

    try {
      // Check cache
      const cached = (await redis.get(cacheKey)) as Awaited<ReturnType<typeof next>> | null;
      if (G.isNotNullable(cached)) {
        return cached as Awaited<ReturnType<typeof next>>;
      }

      // Get fresh data
      const result = await next();

      // Cache the result
      await redis.set(
        cacheKey,
        stringify(result),
        G.isNotNullable(opts.ttlSeconds) ? { ex: opts.ttlSeconds } : undefined
      );

      return result;
    } catch (error) {
      // If there's a cache error, fallback to uncached request
      console.error('Cache error:', error);
      return next();
    }
  });
};

// Public cached procedures
export const publicCachedProcedure = createCachedProcedure(publicProcedure);
export const publicCachedHourProcedure = createCachedProcedure(publicProcedure, {
  ttlSeconds: 60 * 60
});

// Protected cached procedures
export const protectedCachedProcedure = createCachedProcedure(protectedProcedure);
export const protectedCachedHourProcedure = createCachedProcedure(protectedProcedure, {
  ttlSeconds: 60 * 60
});

// Create custom TTL procedures
export const createCustomCachedProcedure = (ttlSeconds: number, isProtected = false) =>
  createCachedProcedure(isProtected ? protectedCachedProcedure : publicCachedProcedure, {
    ttlSeconds
  });
