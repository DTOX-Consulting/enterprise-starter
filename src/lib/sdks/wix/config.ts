import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    apiKey: getEnv('WIX_API_KEY'),
    siteId: getEnv('WIX_SITE_ID'),
    accountId: getEnv('WIX_ACCOUNT_ID')
  }
};
