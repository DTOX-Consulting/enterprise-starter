import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  projectId: getEnv('NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID'),
  serviceName: getEnv('NEXT_PUBLIC_HIGHLIGHT_SERVICE_NAME')
};
