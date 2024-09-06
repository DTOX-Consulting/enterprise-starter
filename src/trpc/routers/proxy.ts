import { z } from 'zod';

import { unboxProxy } from '@/lib/utils/request';
import { publicProcedure } from '@/trpc';

const zodType = z.object({
  url: z.string(),
  method: z.string().optional(),
  body: z.record(z.string()).optional(),
  headers: z.record(z.string()).optional(),
  query: z.record(z.string().optional()).optional()
});

const processProxyRequest = async (
  input: z.infer<typeof zodType>,
  ctx: {
    headers: Headers;
  }
) => {
  const { url, method, body, query } = input;

  const headers = {
    ...Object.fromEntries(ctx.headers.entries()),
    ...input.headers
  };

  const params = {
    url,
    body,
    query,
    method,
    headers
  };

  return unboxProxy(params);
};

export const proxyRouter = {
  url: publicProcedure
    .input(zodType)
    .query(async ({ input, ctx }) => processProxyRequest(input, ctx)),
  urlm: publicProcedure
    .input(zodType)
    .mutation(async ({ input, ctx }) => processProxyRequest(input, ctx))
};
