import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SENTRY_ORG: z.string().min(1),
    SENTRY_PROJECT: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true')
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']),
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY: z.string().min(1)
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NODE_ENV: process.env.NODE_ENV,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY
  }
});

/**
 * Get an environment variable.
 *
 * @param key {keyof typeof env}
 * @param defaultValue {string | boolean | number | undefined}
 * @returns {*}
 */
export const getEnv = (key, defaultValue = '') => {
  return env[key] ?? defaultValue;
};

// export const env = createEnv({
//   server: {
//     // This is optional because it's only used in development.
//     // See https://next-auth.js.org/deployment.
//     NEXTAUTH_URL: z.string().url().optional(),
//     NEXTAUTH_SECRET: z.string().min(1),
//     DATABASE_URL: z.string().min(1),
//     SMTP_FROM: z.string().min(1),
//     POSTMARK_API_TOKEN: z.string().min(1),
//     POSTMARK_SIGN_IN_TEMPLATE: z.string().min(1),
//     POSTMARK_ACTIVATION_TEMPLATE: z.string().min(1),
//     STRIPE_API_KEY: z.string().min(1),
//     STRIPE_WEBHOOK_SECRET: z.string().min(1),
//     STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
//   },
//   client: {
//     NEXT_PUBLIC_APP_URL: z.string().min(1),
//   },
//   runtimeEnv: {
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//     DATABASE_URL: process.env.DATABASE_URL,
//     SMTP_FROM: process.env.SMTP_FROM,
//     POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
//     POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
//     POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
//     STRIPE_API_KEY: process.env.STRIPE_API_KEY,
//     STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
//     STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
//     NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
//   },
// })
