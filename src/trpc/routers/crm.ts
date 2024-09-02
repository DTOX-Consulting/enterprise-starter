import { z } from 'zod';

import { getOrUpsertContact, upsertContact } from '@/lib/sdks/wix';
import { protectedProcedure } from '@/trpc';

export const crmRouter = {
  getOrUpsertContact: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        lastName: z.string(),
        firstName: z.string(),
        notifyMe: z.boolean().optional(),
        subscriptionPlan: z.string().optional()
      })
    )
    .query(async ({ input }) => {
      if (!input.email) {
        return null;
      }
      return getOrUpsertContact(input);
    }),
  upsertContact: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        lastName: z.string(),
        firstName: z.string(),
        notifyMe: z.boolean().optional(),
        subscriptionPlan: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      await upsertContact(input);
      return { success: true };
    })
};
