import { EdgeHighlight } from '@highlight-run/next/server';

import { config } from '@/lib/sdks/highlight/config';

export const withEdgeHighlight: ReturnType<typeof EdgeHighlight> = EdgeHighlight({
  projectID: config.projectId,
  serviceName: config.serviceName
});
