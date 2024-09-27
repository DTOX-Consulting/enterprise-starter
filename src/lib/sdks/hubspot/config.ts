import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  auth: {
    API_KEY: getEnv('HUBSPOT_API_KEY')
  },
  baseUrl: 'https://api.hubapi.com'
};
