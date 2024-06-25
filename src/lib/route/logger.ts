import { type NextRequest, userAgent } from 'next/server';
import { serializeError } from 'serialize-error';

import { getEnv, isProd } from '@/lib/env';
import { logger } from '@/lib/logger';
import { getRequestDetails } from '@/lib/route/params';

const LOG_API_REQUESTS = getEnv('LOG_API_REQUESTS', 'false') === 'true';

export const startLogger = async (request: NextRequest) => {
  const startTime = new Date().getTime(); // Start time in milliseconds

  const { ip, geo } = request;
  const { device, engine, ua, os, browser, isBot, cpu } = userAgent(request);

  const log = {
    request: await getRequestDetails(request),
    meta: {
      ip,
      ua,
      os,
      geo,
      cpu,
      isBot,
      device,
      engine,
      browser
    },
    env: {
      isProd: isProd(),
      vercelEnv: getEnv('VERCEL_ENV'),
      nodeEnv: getEnv('NODE_ENV', 'unset')
    }
  };

  return { log, startTime };
};

export const finishLogger = <T extends Response>({
  log,
  error,
  response,
  startTime
}: {
  response?: T;
  error?: Error;
  startTime: number; // Change the type to 'number'
  log: Awaited<ReturnType<typeof startLogger>>['log'];
}) => {
  const endTime = new Date().getTime(); // End time in milliseconds
  const duration = `${endTime - startTime}ms`; // Calculate duration based on 'startTime' and 'endTime'

  const responseLog = response
    ? {
        status: response.status,
        headers: response.headers,
        statusText: response.statusText,
        // @ts-expect-error -- TSCONVERSION
        body: response.body?._readableStreamController ? '[Response Stream]' : response.body
      }
    : {
        error: serializeError(error)
      };

  Object.assign(log, {
    response: responseLog,
    meta: {
      ...log.meta,
      duration
    }
  });

  if (!LOG_API_REQUESTS) {
    return;
  }

  console.log('========================================================');
  logger[error ? 'error' : 'info'](log as unknown as Record<string, string>, 'API Request');
  console.log('========================================================');
};
