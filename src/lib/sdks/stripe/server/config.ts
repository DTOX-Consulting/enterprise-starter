import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  auth: {
    API_KEY: getEnv('STRIPE_SECRET_KEY')
  }
};
