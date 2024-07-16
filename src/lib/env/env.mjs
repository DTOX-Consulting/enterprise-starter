import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SUPABASE_URL: z.string().min(1),
    HYPERDX_API_KEY: z.string().min(1),
    HUBSPOT_API_KEY: z.string().min(1),
    SENDGRID_API_KEY: z.string().min(1),
    SUPABASE_ANON_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    OTEL_SERVICE_NAME: z.string().min(1),
    OTEL_EXPORTER_OTLP_ENDPOINT: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true')
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_HYPERDX_API_KEY: z.string().min(1),
    NEXT_PUBLIC_OTEL_SERVICE_NAME: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME: z.string().min(1),
    NEXT_PUBLIC_METICULOUS_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test'])
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_URL: process.env.SUPABASE_URL,
    HYPERDX_API_KEY: process.env.HYPERDX_API_KEY,
    HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
    NEXT_PUBLIC_HYPERDX_API_KEY: process.env.NEXT_PUBLIC_HYPERDX_API_KEY,
    NEXT_PUBLIC_OTEL_SERVICE_NAME: process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_METICULOUS_PROJECT_ID: process.env.NEXT_PUBLIC_METICULOUS_PROJECT_ID,
    NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME: process.env.NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME,
    NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
});

/**
 * Get an environment variable.
 *
 * @param key {keyof typeof env}
 * @param defaultValue {string | boolean | number | undefined}
 * @returns {string}
 */
export const getEnv = (key, defaultValue = '') => {
  return env[key] ?? defaultValue;
};

export const isDev = () => getEnv('NEXT_PUBLIC_NODE_ENV') !== 'production';
export const isProd = () => getEnv('NEXT_PUBLIC_NODE_ENV') === 'production';
