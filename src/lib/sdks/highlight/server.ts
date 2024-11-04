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
    const parsed = H.parseHeaders(
      request.headers as unknown as Parameters<typeof H.parseHeaders>[0]
    );
    if (error) H.consumeError(error, parsed.secureSessionId, parsed.requestId);
  } catch (err) {
    console.error('highlightHandler error', err);
  }
};
