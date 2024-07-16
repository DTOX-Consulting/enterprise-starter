import { getEnv } from '@/lib/env';

export const config = {
  redis: {
    auth: {
      url: getEnv('UPSTASH_REDIS_API_URL'),
      token: getEnv('UPSTASH_REDIS_REST_TOKEN')
    }
  }
};
