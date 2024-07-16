import { loadStripe, type Stripe } from '@stripe/stripe-js';

import { config } from '@/lib/sdks/stripe/client/config';

let stripePromise: Promise<Stripe | null> | undefined = undefined;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(config.auth.API_KEY);
  }

  return stripePromise;
};

export { getStripe };
