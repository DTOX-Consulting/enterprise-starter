import { createTRPCRouter } from '@/trpc';
import { aiRouter } from '@/trpc/routers/ai';
import { authRouter } from '@/trpc/routers/auth';
import { mailRouter } from '@/trpc/routers/mail';
import { proxyRouter } from '@/trpc/routers/proxy';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ...aiRouter,
  ...mailRouter,
  ...authRouter,
  ...proxyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
