import { createTRPCRouter } from '@/trpc';
import { aiRouter } from '@/trpc/routers/ai';
import { authRouter } from '@/trpc/routers/auth';
import { crmRouter } from '@/trpc/routers/crm';
import { paymentRouter } from '@/trpc/routers/payment';
import { proxyRouter } from '@/trpc/routers/proxy';
import { uploadRouter } from '@/trpc/routers/upload';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: createTRPCRouter(aiRouter),
  crm: createTRPCRouter(crmRouter),
  auth: createTRPCRouter(authRouter),
  proxy: createTRPCRouter(proxyRouter),
  upload: createTRPCRouter(uploadRouter),
  payment: createTRPCRouter(paymentRouter)
});

// export type definition of API
export type AppRouter = typeof appRouter;
