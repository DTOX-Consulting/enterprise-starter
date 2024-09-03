import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  REPLICATE_API_TOKEN: getEnv('REPLICATE_API_TOKEN')
};
