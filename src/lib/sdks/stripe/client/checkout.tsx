'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { ToastAction } from '@radix-ui/react-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, type Dispatch, type FormEvent, type SetStateAction } from 'react';

import { Button } from '@/components/ui/atoms/button';
import LoadingDots from '@/components/ui/organisms/icons/loading-dots';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { routes } from '@/config/navigation/routes';
import { isNoneTier, type TierName } from '@/config/permissions/features';
import { getStripe } from '@/lib/sdks/stripe/client/auth';
import { triggerElementAction } from '@/lib/utils/dom';
import { ucFirst } from '@/lib/utils/string';
import { api } from '@/trpc/react';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const AutoCheckout = () => {
  const params = useSearchParams();
  const tier = (params.get('plan') ?? params.get('tier')) as TierName | null;

  useEffect(() => {
    if (!tier) return;
    void triggerElementAction('click', 'button', `[data-tier="${tier}"]`);
  }, [tier]);

  return null;
};

export const CheckoutButton = ({ tier }: { tier: TierName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = api.payment.subscribe.useMutation();

  return (
    <Button
      size="lg"
      data-tier={tier}
      className="w-full"
      disabled={loading}
      onClick={handleCheckout(tier, setLoading, mutateAsync, router)}
    >
      {!loading ? 'Subscribe' : <LoadingDots color="hsl(var(--background))" />}
    </Button>
  );
};

export const handleCheckout = (
  tier: TierName,
  setLoading: Dispatch<SetStateAction<boolean>>,
  mutateAsync: ReturnType<typeof api.payment.subscribe.useMutation>['mutateAsync'],
  router: AppRouterInstance
) => {
  return async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const details = await mutateAsync({ tier });
    const finish = () => setTimeout(() => setLoading(false), 500);

    if (details.hasSubscription || !details.session) {
      finish();
      return toast({
        variant: 'warning',
        title: 'Subscription Exists',
        description: 'You already have a subscription! Manage it from settings.',
        action: (
          <ToastAction altText="Go To settings" onClick={() => router.push(routes.settings)}>
            Go To Settings
          </ToastAction>
        )
      });
    }

    finish();
    const stripe = await getStripe();
    sendGTMEvent({ event: 'begin_checkout', tier });
    await stripe?.redirectToCheckout({ sessionId: details.session.id });
  };
};

export const handleManageSubscription = (
  tier: TierName,
  setLoading: Dispatch<SetStateAction<boolean>>,
  mutateAsync: ReturnType<typeof api.payment.manageSubscription.useMutation>['mutateAsync'],
  router: AppRouterInstance
) => {
  return async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const details = await mutateAsync();
    const finish = () => setTimeout(() => setLoading(false), 500);

    if (!details.hasSubscription) {
      finish();
      return toast({
        title: 'No Subscription Found',
        description: `You don't have a ${ucFirst(tier)} subscription! Subscribe to manage it.`,
        action: (
          <ToastAction altText="Go To Pricing" onClick={() => router.push(routes.pricing)}>
            Subscribe
          </ToastAction>
        )
      });
    }

    finish();
    router.push(details.hasSubscription ? details.billing.url : routes.pricing);
  };
};

export const ManageSubscriptionButton = ({ tier }: { tier: TierName }) => {
  const router = useRouter();
  const [managing, setManaging] = useState(false);
  const { mutateAsync } = api.payment.manageSubscription.useMutation();

  return (
    <Button
      className="w-48 bg-pulse"
      disabled={managing || isNoneTier(tier)}
      onClick={handleManageSubscription(tier, setManaging, mutateAsync, router)}
    >
      {!managing ? 'Manage Subscription' : <LoadingDots color="hsl(var(--background))" />}
    </Button>
  );
};
