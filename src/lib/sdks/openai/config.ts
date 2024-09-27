import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  apiKey: getEnv('OPENAI_API_KEY'),
  organization: getEnv('OPENAI_ORG_ID')
};
