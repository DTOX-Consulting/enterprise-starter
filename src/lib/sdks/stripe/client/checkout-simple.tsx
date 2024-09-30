'use client';

import { Button } from '@/components/ui/atoms/button';
import { useAuth } from '@/lib/hooks/use-auth';
import { getStripe } from '@/lib/sdks/stripe/client/auth';
import { createStripeLineItems, getStripeUrls } from '@/lib/sdks/stripe/client/utils';

import type { TierName } from '@/config/permissions/features';

export const handleCheckout = async (tier: TierName, email: string) => {
  const stripe = await getStripe();

  if (!stripe) {
    return;
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

  if (!email) {
    return '';
  }

  return (
    <Button size="lg" className="w-full" onClick={async () => handleCheckout(tier, email)}>
      Subscribe
    </Button>
  );
};
