import { G } from '@mobily/ts-belt';

import { redis } from '@/lib/sdks/upstash/clients/redis';
import { randomInt } from '@/lib/utils/id';
import { parse, stringify, stringifyDeterministic } from '@/lib/utils/json';
import { protectedProcedure, publicProcedure } from '@/trpc';

import type { ProcedureBuilderParams } from '@/trpc/types';

type CacheOptions = {
  ttlSeconds?: number;
  keyPrefix?: string;
  invalidatePercentage?: number;
  enabled?: boolean | ((input: unknown) => boolean);
  getKey?: (path: string, input: unknown) => string;
};

const defaultOptions: Required<CacheOptions> = {
  enabled: true,
  keyPrefix: 'trpc',
  ttlSeconds: 60 * 5, // 5 minutes
  invalidatePercentage: 10, // 10% chance of invalidating the cache
  getKey: (path, input) => `${path}:${stringify(input)}`
};

const validate = async <T extends { ctx: unknown }>(
  cached: unknown,
  next: () => Promise<T>,
  opts: Required<CacheOptions>
) => {
  if (G.isNullable(cached)) {
    return false;
  }

  // test the cache 10% of the time
  if (randomInt(0, 100) >= opts.invalidatePercentage) {
    return true;
  }

  const { ctx: _, ...nextValue } = await next();
  return stringifyDeterministic(cached) === stringifyDeterministic(nextValue);
};

const checkCache = async <R extends { ctx: unknown }>(
  cacheKey: string,
  nextFn: () => Promise<R>,
  opts: Required<CacheOptions>
) => {
  // Check cache
  const cachedStr = await redis.get(cacheKey);
  const cached = typeof cachedStr === 'string' ? parse<Omit<R, 'ctx'>>(cachedStr) : null;

  const isValid = await validate<R>(cached, nextFn, opts);
  return { cached, isValid };
};

const getResult = async <R extends { ctx: unknown }>(
  cacheKey: string,
  nextFn: () => Promise<R>,
  opts: Required<CacheOptions>
) => {
  // Get fresh data
  const result = await nextFn();
  const { ctx: _, ...dataToCache } = result;

  // Cache only the data without context
  await redis.set(
    cacheKey,
    stringify(dataToCache),
    G.isNotNullable(opts.ttlSeconds) ? { ex: opts.ttlSeconds } : undefined
  );

  return result;
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
  const opts = { ...defaultOptions, ...options } as Required<CacheOptions>;
  return procedure.use(async ({ path, rawInput, next, ctx }) => {
    // Check if caching is enabled
    const isEnabled = typeof opts.enabled === 'function' ? opts.enabled(rawInput) : opts.enabled;

    if (G.isNullable(isEnabled) || !isEnabled) {
      return next();
    }

    // Generate cache key
    const cacheKey = `${opts.keyPrefix}:${opts.getKey(path, rawInput)}`;

    type NextType = Awaited<ReturnType<typeof next>> & { ctx: typeof ctx };
    const nextFn = next as () => Promise<NextType>;

    try {
      const { cached, isValid } = await checkCache<NextType>(cacheKey, nextFn, opts);

      if (G.isNotNullable(cached) && isValid) {
        // Return cached data with current context
        return Object.assign(cached, { ctx }) as NextType;
      }

      // Invalidate cache if it's not valid
      if (G.isNotNullable(cached) && !isValid) {
        void redis.del(cacheKey);
      }

      return await getResult<NextType>(cacheKey, nextFn, opts);
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
