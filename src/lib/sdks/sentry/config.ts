import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    token: getEnv('SENTRY_AUTH_TOKEN')
  },
  dsn: getEnv('NEXT_PUBLIC_SENTRY_DSN')
};
