import { getEnv } from '@/lib/env';

import type { SubscriptionPlan } from 'types';

export const freePlan: SubscriptionPlan = {
  name: 'Free',
  description:
    'The free plan is limited to 3 business ideas. Upgrade to the PRO plan for unlimited ideas.',
  stripePriceId: ''
};

export const proPlan: SubscriptionPlan = {
  name: 'PRO',
  description: 'The PRO plan has unlimited businesses ideas.',
  stripePriceId: getEnv('STRIPE_PRO_MONTHLY_PLAN_ID', '')
};
