import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  projectId: getEnv('NEXT_PUBLIC_TERMLY_PROJECT_ID'),
  autoBlock: getEnv('NEXT_PUBLIC_TERMLY_AUTO_BLOCK')
};
