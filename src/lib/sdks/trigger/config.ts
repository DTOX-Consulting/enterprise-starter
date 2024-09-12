import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  id: getEnv('TRIGGER_API_ID'),
  apiKey: getEnv('TRIGGER_API_KEY'),
  apiUrl: getEnv('TRIGGER_API_URL')
};
