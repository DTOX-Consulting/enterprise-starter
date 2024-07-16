import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  auth: {
    API_KEY: getEnv('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
  }
};
