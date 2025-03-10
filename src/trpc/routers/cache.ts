import { G } from '@mobily/ts-belt';
import { z } from 'zod';

import { authorize } from '@/lib/auth/authorize';
import { redis } from '@/lib/sdks/upstash/clients/redis';
import { protectedProcedure } from '@/trpc';

export const cacheRouter = {
  get: protectedProcedure.input(z.object({ key: z.string() })).query(async ({ input, ctx }) => {
    authorize({
      action: 'cache.get',
      session: ctx.session,
      data: { key: input.key }
    });

    try {
      const data = await redis.get(input.key);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null
      };
    }
  }),

  set: protectedProcedure
    .input(
      z.object({
        key: z.string(),
        value: z.string(),
        ttl: z.number().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      authorize({
        action: 'cache.set',
        session: ctx.session,
        data: { key: input.key }
      });

      try {
        if (G.isNotNullable(input.ttl)) {
          await redis.set(input.key, input.value, { ex: input.ttl });
        } else {
          await redis.set(input.key, input.value);
        }
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }),

  delete: protectedProcedure.input(z.object({ key: z.string() })).mutation(async ({ input }) => {
    await redis.del(input.key);
    return { success: true };
  })
};
