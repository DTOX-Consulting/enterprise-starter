import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  projectId: getEnv('NEXT_PUBLIC_METICULOUS_PROJECT_ID'),
  scriptUrl: 'https://snippet.meticulous.ai/v1/meticulous.js',
  isProductionEnvironment: getEnv('NEXT_PUBLIC_ENVIRONMENT') === 'production'
};
