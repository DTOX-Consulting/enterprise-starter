import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  R2_DOMAIN: getEnv('R2_DOMAIN'),
  R2_ACCOUNT_ID: getEnv('R2_ACCOUNT_ID'),
  R2_ACCESS_KEY_ID: getEnv('R2_ACCESS_KEY_ID'),
  R2_SECRET_ACCESS_KEY: getEnv('R2_SECRET_ACCESS_KEY')
};
