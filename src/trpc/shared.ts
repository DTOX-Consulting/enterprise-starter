import { G } from '@mobily/ts-belt';
import superJson from 'superjson';

import { getEnv } from '@/lib/env/env.mjs';

import type { AppRouter } from '@/trpc/routers';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export const transformer = superJson;

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function getUrl() {
  return `${getBaseUrl()}/api/trpc`;
}

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  const vercelUrl = getEnv('VERCEL_URL', '');
  if (G.isNotNullable(vercelUrl)) return `https://${vercelUrl}`;

  const port = getEnv('PORT') ?? 3000;
  return `http://localhost:${port}`;
}
