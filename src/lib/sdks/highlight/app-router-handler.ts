import { AppRouterHighlight } from '@highlight-run/next/server';

import { config } from '@/lib/sdks/highlight/config';

export const withAppRouterHighlight = AppRouterHighlight({
  projectID: config.projectId,
  serviceName: config.serviceName
});
