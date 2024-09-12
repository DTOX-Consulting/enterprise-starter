import { TriggerClient } from '@trigger.dev/sdk';

import { config } from '@/lib/sdks/trigger/config';

export const client = new TriggerClient(config);
