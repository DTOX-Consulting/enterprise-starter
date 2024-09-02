import { contacts } from '@wix/crm';
import { createClient, ApiKeyStrategy } from '@wix/sdk';

import { config } from '@/lib/sdks/wix/config';

export const wix = createClient({
  modules: { contacts },
  auth: ApiKeyStrategy(config.auth)
});
