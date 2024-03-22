import { G } from '@mobily/ts-belt';

// import { env } from '@/lib/env/env.mjs';

const envs = ['development', 'production', 'staging'] as const;
const envUrls = [
  'http://localhost:3000',
  'https://staging.example.com',
  'https://example.com'
] as const;

export type ENV = (typeof envs)[number];
export type ENV_URLS = (typeof envUrls)[number];

export const urls: Record<ENV, ENV_URLS> = {
  development: 'http://localhost:3000',
  staging: 'https://staging.example.com',
  production: 'https://example.com'
};

export const getEnvUrl = () => urls[currentEnv()];
export const isDev = () => !isProd() && !isStaging();
export const isProd = () => getEnv('VERCEL_ENV', '') === 'production';
export const isStaging = () => getEnv('VERCEL_ENV', '') === 'staging';
export const currentEnv = (): ENV =>
  isProd() ? 'production' : isStaging() ? 'staging' : 'development';

export const getEnv = (key: string, defaultValue?: string) => {
  const value = process?.env?.[key] ?? defaultValue;

  if (G.isNullable(value)) {
    throw new Error(`Missing environment variable ${key}`);
  }

  return value.split(String.raw`\n`).join('\n');
};
