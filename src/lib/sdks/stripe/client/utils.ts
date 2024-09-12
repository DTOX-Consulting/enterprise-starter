import { type TierName, tiers } from '@/config/permissions/features';
import { getEnv } from '@/lib/env/env.mjs';
import { getLocation } from '@/lib/utils/dom';

export const getStripeMode = () =>
  getEnv('NEXT_PUBLIC_ENVIRONMENT') === 'production' ? 'live' : 'test';

export const getStripeTierConfig = (tier: TierName) => {
  const mode = getStripeMode();
  return tiers[tier].stripe[mode];
};

export const getStripeAmount = (tier: TierName) => getStripeTierConfig(tier).amount;

export const getStripePriceId = (tier: TierName) => getStripeTierConfig(tier).priceId;

export const getStripeProductId = (tier: TierName) => getStripeTierConfig(tier).productId;

export const getKindeSubscriptionPermissionsKeyFromPriceId = (priceId: string) => {
  const mode = getStripeMode();
  return Object.values(tiers).find((tier) => tier.stripe[mode].priceId === priceId)?.kinde
    .subscriptionPermissionsKey;
};

export const getStripeUrls = (tier?: TierName) => {
  const appUrl = getEnv('NEXT_PUBLIC_APP_URL');
  const nextUrl = getLocation()?.pathname ?? '/';

  return {
    cancelUrl: `${appUrl}/pricing/cancel`,
    returnUrl: `${appUrl}/auth-callback?next=${nextUrl}`,
    checkoutUrl: `${appUrl}/pricing/checkout?plan=${tier}`,
    successUrl: `${appUrl}/pricing/success?session_id={CHECKOUT_SESSION_ID}`
  };
};

export const createStripeLineItems = (tier: TierName) => [
  {
    price: getStripePriceId(tier),
    quantity: 1
  }
];
