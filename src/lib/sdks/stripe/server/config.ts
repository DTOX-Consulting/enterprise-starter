import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    API_KEY: getEnv('STRIPE_SECRET_KEY')
  }
};
