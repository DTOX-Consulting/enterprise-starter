import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  openai: {
    apiKey: getEnv('OPENAI_API_KEY'),
    organization: getEnv('OPENAI_ORG_ID')
  },
  anthropic: {
    apiKey: getEnv('ANTHROPIC_API_KEY')
  },
  mistral: {
    apiKey: getEnv('MISTRAL_API_KEY')
  },
  gemini: {
    apiKey: getEnv('GEMINI_API_KEY')
  }
} as const;
