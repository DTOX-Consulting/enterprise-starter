import Stripe from 'stripe';

import { getEnv } from '@/lib/env';

export const stripe = new Stripe(getEnv('STRIPE_API_KEY'), {
  apiVersion: '2023-10-16',
  typescript: true
});
