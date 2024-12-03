import { ipAddress, geolocation } from '@vercel/functions';
import { type NextRequest, userAgent } from 'next/server';
import { serializeError } from 'serialize-error';

import { getEnv, isProd } from '@/lib/env/env.mjs';
import { logger } from '@/lib/logger/console';
import { getRequestDetails } from '@/lib/route/params';

const LOG_API_REQUESTS = getEnv('LOG_API_REQUESTS');

export const startLogger = async (request: NextRequest) => {
  const startTime = new Date().getTime(); // Start time in milliseconds

  const ip = ipAddress(request);
  const geo = geolocation(request);
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
      nodeEnv: getEnv('NODE_ENV') ?? 'unset'
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
        body:
          'body' in response && response.body && '_readableStreamController' in response.body
            ? '[Response Stream]'
            : (response.body ?? null)
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
  logger[error ? 'error' : 'info']('API Request', log);
  console.log('========================================================');
};
