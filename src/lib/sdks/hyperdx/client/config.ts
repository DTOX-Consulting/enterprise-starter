'use client';

import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  apiKey: getEnv('NEXT_PUBLIC_HYPERDX_API_KEY'),
  service: getEnv('NEXT_PUBLIC_OTEL_SERVICE_NAME')
};
