import Stripe from 'stripe';

import { config } from '@/lib/sdks/stripe/server/config';

export const stripe = new Stripe(config.auth.API_KEY, {
  typescript: true
  // apiVersion: '2024-04-10'
});
