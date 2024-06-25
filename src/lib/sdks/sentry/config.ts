import { getEnv } from '@/lib/env';
import { isDev } from '@Root/config/env.config.mjs';

import type { init } from '@sentry/nextjs';

type SentryConfig = NonNullable<Parameters<typeof init>[0]> & {
  auth: {
    token: string;
  };
};

export const config: SentryConfig = {
  auth: {
    token: getEnv('SENTRY_AUTH_TOKEN')
  },
  dsn: getEnv('NEXT_PUBLIC_SENTRY_DSN'),
  tracesSampleRate: 1,
  spotlight: false,
  debug: isDev
};
