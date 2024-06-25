import { getEnv } from '@/lib/env';

export const config = {
  apiKey: getEnv('OPENAI_API_KEY'),
  organization: getEnv('OPENAI_ORG_ID')
};
