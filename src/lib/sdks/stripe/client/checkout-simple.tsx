'use client';

import { G } from '@mobily/ts-belt';

import { Button } from '@/components/ui/atoms/button';
import { useAuth } from '@/lib/hooks/use-auth';
import { getStripe } from '@/lib/sdks/stripe/client/auth';
import { createStripeLineItems, getStripeUrls } from '@/lib/sdks/stripe/client/utils';

import type { TierName } from '@/config/permissions/features';
import type { StripeError } from '@stripe/stripe-js';

export const handleCheckout = async (
  tier: TierName,
  email: string
): Promise<StripeError | null> => {
  const stripe = await getStripe();

  if (!stripe) {
    return null;
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: createStripeLineItems(tier),
    customerEmail: email,
    mode: 'subscription',
    ...getStripeUrls()
  });

  return error;
};

export const CheckoutButton = ({ tier }: { tier: TierName }) => {
  const { user } = useAuth();
  const email = user?.email;

  if (G.isNullable(email)) {
    return null;
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        void handleCheckout(tier, email);
      }}
    >
      Subscribe
    </Button>
  );
};
