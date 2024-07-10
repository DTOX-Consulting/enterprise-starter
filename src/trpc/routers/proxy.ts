import { G } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';
import { z } from 'zod';

import { createUrl } from '@/lib/utils/promise';
import { publicProcedure } from '@/trpc';

import type { GenericObject } from '@/lib/utils/object';

const allowedHeaders = [
  'dnt',
  'accept',
  'user-agent',
  'content-type',
  'accept-encoding',
  'accept-language'
];

type ProxyResponse = {
  success: boolean;
  error?: Error;
  data?: unknown;
};

export const proxyRouter = {
  url: publicProcedure
    .input(
      z.object({
        url: z.string(),
        method: z.string().optional(),
        body: z.record(z.string()).optional(),
        headers: z.record(z.string()).optional(),
        query: z.record(z.string().optional()).optional()
      })
    )
    .query(async ({ input, ctx }) => {
      const { url, method = 'GET', body, query, headers } = input;
      const _realHeaders = { ...Object.fromEntries(ctx.headers.entries()), ...headers };
      return doProxy({ url, method, body, query, headers: _realHeaders });
    }),
  urlm: publicProcedure
    .input(
      z.object({
        url: z.string(),
        method: z.string().optional(),
        body: z.record(z.string()).optional(),
        headers: z.record(z.string()).optional(),
        query: z.record(z.string().optional()).optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { url, method = 'GET', body, query, headers } = input;
      const _realHeaders = { ...Object.fromEntries(ctx.headers.entries()), ...headers };
      return doProxy({ url, method, body, query, headers: _realHeaders });
    })
};

const doProxy = async (input: {
  url: string;
  method?: string;
  body?: Record<string, string>;
  headers?: Record<string, string>;
  query?: Record<string, string | undefined>;
}) => {
  const { url, method = 'GET', body, query, headers } = input;

  if (G.isNullable(url)) {
    return {
      success: false,
      error: new Error('No URL provided')
    } as ProxyResponse;
  }

  const _realHeaders = { ...headers };

  const realBody = G.isNotNullable(body) ? JSON.stringify(body) : undefined;

  const realHeaders = allowedHeaders.reduce((acc, key) => {
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    G.isNotNullable(_realHeaders[key]) && (acc[key] = _realHeaders[key]);
    return acc;
  }, {} as GenericObject);

  const response = await fetch(createUrl(url, query as GenericObject<string>), {
    method,
    body: realBody,
    headers: {
      ...realHeaders,
      'Content-Type': 'application/json'
    }
  });

  const { data, error } = await unbox(response.json());

  return { success: !error, data, error } as ProxyResponse;
};
