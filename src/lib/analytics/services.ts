import { GoogleAnalytics } from '@/lib/analytics/google';
import { config as googleConfig } from '@/lib/analytics/google/config';
import { MixpanelAnalytics } from '@/lib/analytics/mixpanel';
import { config as mixpanelConfig } from '@/lib/analytics/mixpanel/config';

const mixpanel = new MixpanelAnalytics({
  token: mixpanelConfig.token,
  ...mixpanelConfig.options
});

const google = new GoogleAnalytics({
  token: googleConfig.token,
  ...googleConfig.options
});

export const services = {
  google,
  mixpanel
};
