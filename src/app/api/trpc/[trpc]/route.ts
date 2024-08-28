import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { getEnv } from '@/lib/env';
import { createTRPCContext } from '@/trpc';
import { appRouter } from '@/trpc/routers';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const handler = async (req: NextRequest) =>
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: '/api/trpc',
    createContext: async () => createTRPCContext({ req }),
    onError:
      getEnv('VERCEL_ENV') === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined
  });

export { handler as GET, handler as POST };
