import { createAppRoute } from '@trigger.dev/nextjs';

import { client } from '@/lib/sdks/trigger/client';
// eslint-disable-next-line import-x/no-unassigned-import
import '@/trigger/jobs';

// this route is used to send and receive data with Trigger.dev
export const { POST } = createAppRoute(client);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
