import { G } from '@mobily/ts-belt';

import { redis } from '@/lib/sdks/upstash/clients/redis';
import { stringify } from '@/lib/utils/stringify';
import { protectedProcedure, publicProcedure } from '@/trpc';

import type { ProcedureBuilderParams } from '@/trpc/types';

type CacheOptions = {
  ttlSeconds?: number;
  enabled?: boolean | ((input: unknown) => boolean);
  keyPrefix?: string;
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

export const createCachedProcedure = <
  S extends boolean | undefined,
  T extends ProcedureBuilderParams<S> = ProcedureBuilderParams<S>
>(
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

// Create custom TTL procedures
export const createCustomCachedProcedure = (ttlSeconds: number, isProtected = false) => {
  const procedure = isProtected ? protectedProcedure : publicProcedure;
  return createCachedProcedure(procedure as ProcedureBuilderParams, {
    ttlSeconds
  });
};

const config = {
  '5mins': { ttlSeconds: 60 * 5 },
  '1hour': { ttlSeconds: 60 * 60 },
  '1day': { ttlSeconds: 60 * 60 * 24 }
} as const;

type ConfigKey = keyof typeof config;

type Prefix = 'public' | 'protected';

type ConfigKeys = `${Prefix}${ConfigKey}`;

type ProcedureType = CachedProcedure | ProtectedCachedProcedure;

type CachedProcedure = ReturnType<typeof createCachedProcedure>;

type ProtectedCachedProcedure = ReturnType<typeof createCachedProcedure<true>>;

export const {
  public5mins: publicCachedProcedure,
  protected5mins: protectedCachedProcedure,
  public1hour: publicCachedHourProcedure,
  protected1hour: protectedCachedHourProcedure,
  public1day: publicCachedDayProcedure,
  protected1day: protectedCachedDayProcedure
} = (function createConfiguredProcedures() {
  const procedures = {} as Record<ConfigKeys, ProcedureType>;

  for (const [key, { ttlSeconds }] of Object.entries(config)) {
    const procedureOptions = { ttlSeconds };
    const publicKey = `public${key}` as ConfigKeys;
    const protectedKey = `protected${key}` as ConfigKeys;
    procedures[publicKey] = createCachedProcedure(publicProcedure, procedureOptions);
    procedures[protectedKey] = createCachedProcedure<true>(
      protectedProcedure as ProcedureBuilderParams<true>,
      procedureOptions
    );
  }

  return procedures;
})();
