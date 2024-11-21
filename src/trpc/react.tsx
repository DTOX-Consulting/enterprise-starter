'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  httpLink,
  splitLink,
  loggerLink,
  type Operation,
  unstable_httpBatchStreamLink
} from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';

import { getEnv } from '@/lib/env/env.mjs';
import { getUrl, transformer } from '@/trpc/shared';

import type { AppRouter } from '@/trpc/routers';

export const api: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode; headers: Headers }) {
  const linkCondition = (op: Operation) => op.context.skipBatch === true;

  const linkSetup = {
    url: getUrl(),
    headers() {
      const heads = new Map<string, string>(props.headers);
      heads.set('x-trpc-source', 'react');
      heads.delete('cf-connecting-ip');
      return Object.fromEntries(heads);
    }
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            suspense: false,
            staleTime: 60000,
            cacheTime: 600000,
            refetchOnMount: false,
            keepPreviousData: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
          }
        }
      })
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            getEnv('NEXT_PUBLIC_ENVIRONMENT') === 'development' ||
            (op.direction === 'down' && op.result instanceof Error)
        }),

        splitLink({
          condition: linkCondition,
          true: httpLink(linkSetup),
          false: unstable_httpBatchStreamLink({
            maxURLLength: 2083,
            ...linkSetup
          })
        })
      ]
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  );
}
