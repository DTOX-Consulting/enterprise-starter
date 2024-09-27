/* eslint-disable jsdoc/no-types */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  skipValidation: true, // Skip validation for now
  server: {
    // Vercel
    VERCEL_URL: z.string().min(1).optional(),
    NEXT_RUNTIME: z.enum(['edge', 'nodejs']).optional(),
    VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),

    // Email
    RESEND_API_KEY: z.string().min(1),
    SENDGRID_API_KEY: z.string().min(1).optional(),

    // Security
    ARCJET_KEY: z.string().min(1),

    // Database
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),

    // Supabase
    SUPABASE_JWT_SECRET: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

    // Upstash
    UPSTASH_REDIS_API_URL: z.string().min(1).optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

    // Trigger
    TRIGGER_API_ID: z.string().min(1),
    TRIGGER_API_KEY: z.string().min(1),
    TRIGGER_API_URL: z.string().min(1),

    // Kinde
    KINDE_SITE_URL: z.string().min(1),
    KINDE_CLIENT_ID: z.string().min(1),
    KINDE_ISSUER_URL: z.string().min(1),
    KINDE_CLIENT_SECRET: z.string().min(1),
    KINDE_POST_LOGOUT_REDIRECT_URL: z.string().min(1),
    KINDE_POST_LOGIN_REDIRECT_URL: z.string().min(1),

    // Storage
    R2_ACCOUNT_ID: z.string().min(1),
    R2_TOKEN: z.string().min(1),
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_SECRET_ACCESS_KEY: z.string().min(1),

    // Payment
    STRIPE_SECRET_KEY: z.string().min(1),

    // AI/ML
    OPENAI_ORG_ID: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    OPENAI_PROJECT_ID: z.string().min(1).optional(),
    REPLICATE_API_TOKEN: z.string().min(1).optional(),

    // CRM
    WIX_API_KEY: z.string().min(1).optional(),
    WIX_SITE_ID: z.string().min(1).optional(),
    WIX_ACCOUNT_ID: z.string().min(1).optional(),
    HUBSPOT_API_KEY: z.string().min(1).optional(),

    // Google
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
    GOOGLE_CLIENT_SUBJECT: z.string().min(1).optional(),
    GOOGLE_PRIVATE_KEY: z.string().min(1).optional(),
    GOOGLE_CLIENT_EMAIL: z.string().min(1).optional(),
    GOOGLE_PROJECT_ID: z.string().min(1).optional(),

    // Environment
    PORT: z.number().optional(),
    DOMAIN: z.string().min(1).optional(),
    NODE_ENV: z.enum(['development', 'production']).optional(),
    LOG_API_REQUESTS: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true'),
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform((value) => value === 'true')
  },
  client: {
    // App Config
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_ENVIRONMENT: z.enum(['development', 'staging', 'production', 'testing']),

    // Database
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

    // Monitoring
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME: z.string().min(1),
    NEXT_PUBLIC_METICULOUS_PROJECT_ID: z.string().min(1),

    // Payment
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),

    // Analytics
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string().min(1).optional(),
    NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN: z.string().min(1).optional()
  },
  runtimeEnv: {
    // ======================================== Server ======================================== //
    // Vercel
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,

    // Environment
    PORT: process.env.PORT,
    ANALYZE: process.env.ANALYZE,
    NODE_ENV: process.env.NODE_ENV,

    // Security
    ARCJET_KEY: process.env.ARCJET_KEY,

    // Email
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,

    // Supabase
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

    // Trigger
    TRIGGER_API_ID: process.env.TRIGGER_API_ID,
    TRIGGER_API_KEY: process.env.TRIGGER_API_KEY,
    TRIGGER_API_URL: process.env.TRIGGER_API_URL,

    // Kinde
    KINDE_SITE_URL: process.env.KINDE_SITE_URL,
    KINDE_CLIENT_ID: process.env.KINDE_CLIENT_ID,
    KINDE_ISSUER_URL: process.env.KINDE_ISSUER_URL,
    KINDE_CLIENT_SECRET: process.env.KINDE_CLIENT_SECRET,
    KINDE_POST_LOGOUT_REDIRECT_URL: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    KINDE_POST_LOGIN_REDIRECT_URL: process.env.KINDE_POST_LOGIN_REDIRECT_URL,

    // Storage
    R2_TOKEN: process.env.R2_TOKEN,
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,

    // Payment
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    // AI/ML
    OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_PROJECT_ID: process.env.OPENAI_PROJECT_ID,
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,

    // CRM
    WIX_API_KEY: process.env.WIX_API_KEY,
    WIX_SITE_ID: process.env.WIX_SITE_ID,
    WIX_ACCOUNT_ID: process.env.WIX_ACCOUNT_ID,
    HUBSPOT_API_KEY: process.env.HUBSPOT_API_KEY,

    // ======================================== Client ======================================== //
    // App Config
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,

    // Database
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    // Monitoring
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID: process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
    NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME: process.env.NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME,
    NEXT_PUBLIC_METICULOUS_PROJECT_ID: process.env.NEXT_PUBLIC_METICULOUS_PROJECT_ID,

    // Analytics
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN,

    // Payment
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  }
});

/**
 * Get an environment variable.
 *
 * @template {keyof typeof env} T
 * @param {T} key - The key of the environment variable.
 * @param {typeof env[T]} [defaultValue=''] - The default value if the environment variable is not set.
 * @returns {typeof env[T]} The value of the environment variable or the default value.
 */
export const getEnv = (key, defaultValue = '') => env[key] ?? defaultValue;

const domain = getEnv('DOMAIN');
const port = getEnv('PORT', 3000);
const currentEnv = getEnv('NEXT_PUBLIC_ENVIRONMENT');

/** @type {Record<typeof currentEnv, string>} */
const environmentUrls = {
  production: `https://${domain}`,
  staging: `https://staging.${domain}`,
  testing: `https://testing.${domain}`,
  development: `http://localhost:${port}`
};

export const isTest = () => currentEnv === 'testing';
export const isDev = () => currentEnv === 'development';
export const isStaging = () => currentEnv === 'staging';
export const isProd = () => currentEnv === 'production';

/**
 * Get the URL for the current environment.
 *
 * @returns {typeof environmentUrls[keyof typeof environmentUrls]} The URL for the current environment.
 */
export const getEnvUrl = () => environmentUrls[currentEnv];
