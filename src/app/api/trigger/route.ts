import { createAppRoute } from '@trigger.dev/nextjs';

// eslint-disable-next-line import/no-unassigned-import
import '@/jobs';
import { client } from '@/trigger';

// this route is used to send and receive data with Trigger.dev
export const { POST } = createAppRoute(client);

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
