import { defaultSubscriptionPermissionsKey } from '@/config/permissions/features';
import { setPermission } from '@/lib/sdks/kinde/api/permissions';
import { refreshUserClaimsByEmail } from '@/lib/sdks/kinde/api/utils';
import { getKindeSubscriptionPermissionsKeyFromPriceId } from '@/lib/sdks/stripe/client/utils';
import { stripe as stripeTrigger } from '@/lib/sdks/stripe/server/trigger';
import { getCustomerEmail } from '@/lib/sdks/stripe/server/utils';
import { client } from '@/lib/sdks/trigger/client';

// brew install stripe/stripe-cli/stripe
// https://docs.stripe.com/stripe-cli?shell=true
export const stripeSubscription = client.defineJob({
  version: '0.1.0',
  id: 'stripe-customer-subscription',
  name: 'Stripe Customer Subscription',
  trigger: stripeTrigger.onCustomerSubscription({
    events: [
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted'
    ]
  }),
  run: async (payload, _, ctx) => {
    const email = await getCustomerEmail(payload.customer);
    const priceId = payload.items.data[0]?.price.id ?? '';

    if (!priceId) {
      throw new Error('Price ID not found');
    }

    const subscriptionKey = getKindeSubscriptionPermissionsKeyFromPriceId(priceId) ?? '';

    if (!subscriptionKey) {
      throw new Error('Subscription ID not found');
    }

    const key =
      ctx.event.name === 'customer.subscription.deleted'
        ? defaultSubscriptionPermissionsKey
        : subscriptionKey;

    await setPermission(email, key);
    await refreshUserClaimsByEmail(email);
  }
});
