import { Stripe } from '@trigger.dev/stripe';

import { config } from '@/lib/sdks/stripe/server/config';

export const stripe = new Stripe({
  id: 'stripe',
  apiKey: config.auth.API_KEY
});
