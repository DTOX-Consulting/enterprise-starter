import { H } from '@highlight-run/node';

import { getEnv } from '@/lib/env/env.mjs';
import { config } from '@/lib/sdks/highlight/config';

import type { NextRequest } from 'next/server';

H.init({
  projectID: config.projectId,
  serviceName: config.serviceName,
  environment: getEnv('VERCEL_ENV')
});

export const highlight = H;

export const highlightHandler = (request: NextRequest, error?: Error) => {
  try {
    console.log('highlightHandler', request.headers);
    const parsed = H.parseHeaders(request.headers);
    if (error) H.consumeError(error, parsed.secureSessionId, parsed.requestId);
  } catch (e) {
    console.error('highlightHandler error', e);
  }
};
