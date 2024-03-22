import { createTRPCProxyClient, loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { headers } from 'next/headers';

import { getEnv } from '@/lib/env';
import { getUrl, transformer } from '@/trpc/shared';

import type { AppRouter } from '@/trpc/routers';

let trpcHeader = {};

const client = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        getEnv('NODE_ENV') === 'development' ||
        (op.direction === 'down' && op.result instanceof Error)
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        return trpcHeader;
      }
    })
  ]
});

export const createApi = () => {
  const heads = new Map(headers());
  heads.set('x-trpc-source', 'rsc');
  trpcHeader = Object.fromEntries(heads);

  return client;
};
