import { getEnv, isDev } from '@/lib/env/env.mjs';

export const config = {
  token: getEnv('NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN'),
  options: {
    debug: isDev(),
    ignore_dnt: true,
    track_pageview: true,
    track_links_timeout: 300,
    persistence: 'localStorage'
  }
};
