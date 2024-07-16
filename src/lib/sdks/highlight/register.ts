import { registerHighlight as init } from '@highlight-run/next/server';

import { config } from '@/lib/sdks/highlight/config';

export const registerHighlight = async () =>
  init({
    projectID: config.projectId,
    serviceName: config.serviceName
  });
