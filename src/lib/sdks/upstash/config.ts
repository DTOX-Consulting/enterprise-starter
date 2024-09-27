import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  redis: {
    auth: {
      url: getEnv('UPSTASH_REDIS_API_URL'),
      token: getEnv('UPSTASH_REDIS_REST_TOKEN')
    }
  }
};
