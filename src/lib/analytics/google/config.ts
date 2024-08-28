import { getEnv, isDev } from '@/lib/env/env.mjs';

export const config = {
  token: getEnv('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'),
  gtm_id: getEnv('NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID'),
  options: {
    debug: isDev(),
    send_page_view: true
  }
};
