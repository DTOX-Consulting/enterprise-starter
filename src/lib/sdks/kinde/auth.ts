import { init } from '@kinde/management-api-js';

import { config } from '@/lib/sdks/kinde/config';

init({
  clientId: config.auth.clientId,
  kindeDomain: config.auth.authDomain,
  clientSecret: config.auth.clientSecret
});
