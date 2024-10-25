'use client';

import { G } from '@mobily/ts-belt';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { useMemo, type FormEvent } from 'react';
import { unbox } from 'unbox-js';

import { Button } from '@/components/ui/atoms/button';
import LoadingDots from '@/components/ui/organisms/icons/loading-dots';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { getStripe } from '@/lib/sdks/stripe/client/auth';
import { getStripeUrls } from '@/lib/sdks/stripe/client/utils';
import { ucFirst } from '@/lib/utils/string';
import { api } from '@/trpc/react';

import type { TierName } from '@/config/permissions/features';
import type { Stripe, StripeElements } from '@stripe/stripe-js';

export const CheckoutLoader = () => (
  <div className="mx-auto flex h-80 w-full items-center justify-center">
    <LoadingDots />
  </div>
);

export const CheckoutButton = ({ tier }: { tier: TierName }) => {
  if (tier === 'starter') {
    return (
      <Button size="lg" className="w-full" disabled>
        Subscribe
      </Button>
    );
  }
  return (
    <Button asChild size="lg" className="w-full">
      <Link href={getStripeUrls(tier).checkoutUrl}>Subscribe</Link>
    </Button>
  );
};

export const CheckoutElement = ({ tier }: { tier: TierName }) => {
  const { data } = api.payment.createIntent.useQuery({ tier });

  const stripe = useMemo(async () => getStripe(), []);

  const options = useMemo(
    () => ({
      clientSecret: data?.intent.client_secret ?? ''
    }),
    [data?.intent.client_secret]
  );

  if (!Boolean(data?.intent.client_secret)) {
    return <CheckoutLoader />;
  }

  return (
    <Elements stripe={stripe} options={options}>
      <CheckoutForm tier={tier} />
    </Elements>
  );
};

type CheckoutProps = {
  tier: TierName;
  stripe: Stripe;
  elements: StripeElements;
};

const CheckoutForm = ({ tier }: { tier: TierName }) => {
  const stripe = useStripe() ?? undefined;
  const elements = useElements() ?? undefined;

  if (!stripe || !elements) {
    return <CheckoutLoader />;
  }

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        confirmPayment({ tier, stripe, elements }).catch(console.error);
      }}
    >
      <div className="h-80 space-y-4">
        <PaymentElement />
      </div>
      <Button type="submit" size="lg" className="mt-4 w-full">
        Pay
      </Button>
    </form>
  );
};

export const confirmPayment = async ({ tier, stripe, elements }: Required<CheckoutProps>) => {
  const { data, error } = await unbox(
    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: getStripeUrls().returnUrl
      }
    })
  );

  const err = error ?? data.error;

  if (G.isNotNullable(error)) {
    return toast({
      title: `${ucFirst(tier)} Payment Error`,
      description: err.message
    });
  }
};
