export const isTest = process.env.VERCEL_ENV === 'test';
export const isDev = process.env.VERCEL_ENV === 'development';
export const isProd = process.env.VERCEL_ENV === 'production';
export const isDocker = process.env.IS_DOCKER === 'true';
export const isVercel = process.env.VERCEL === '1';
export const isCloudflare = process.env.CLOUDFLARE === '1';
