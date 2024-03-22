import { TriggerClient } from '@trigger.dev/sdk';

import { getEnv } from '@/lib/env';

export const client = new TriggerClient({
  id: 'default-x9aS',
  apiKey: getEnv('TRIGGER_API_KEY'),
  apiUrl: getEnv('TRIGGER_API_URL')
});
