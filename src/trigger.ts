import { TriggerClient } from '@trigger.dev/sdk';

import { getEnv } from '@/lib/env';

export const client = new TriggerClient({
  id: 'pulse-app-lVYK',
  apiKey: getEnv('TRIGGER_API_KEY'),
  apiUrl: getEnv('TRIGGER_API_URL')
});
