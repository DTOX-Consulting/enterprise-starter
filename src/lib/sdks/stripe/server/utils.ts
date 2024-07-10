import {
  tiers,
  defaultTier,
  getSubscriptionPermissionsKey,
  type TierName
} from '@/config/permissions/features';
import { getUserSession, type User } from '@/lib/sdks/kinde/api/session';
import { getStripeMode } from '@/lib/sdks/stripe/client/utils';
import { stripe } from '@/lib/sdks/stripe/server/auth';

import type Stripe from 'stripe';

export const getTierNameFromSubscription = (subscription?: Stripe.Subscription) => {
  if (!subscription) {
    return defaultTier;
  }

  const mode = getStripeMode();
  const priceId = subscription?.items?.data[0]?.price.id;

  const tier = Object.entries(tiers)
    .reverse()
    .find(([, { stripe }]) => stripe[mode].priceId === priceId);

  return tier ? (tier[0] as TierName) : defaultTier;
};

export const findStripeCustomer = async (user?: User) => {
  const { email } = user ?? (await getUserSession()).user;

  const customers = await stripe.customers.list({
    email
  });

  return customers.data[0];
};

export const upsertStripeCustomer = async (user?: User) => {
  const { email, name } = user ?? (await getUserSession()).user;

  const customers = await stripe.customers.list({
    email
  });

  let customer: Stripe.Customer | undefined;

  if (customers.data.length > 0) {
    customer = customers.data[0];
  } else {
    customer = await stripe.customers.create({
      email,
      name
    });
  }

  if (!customer) {
    throw new Error('Customer not found');
  }

  return customer;
};

export const getStripeDetails = async (user?: User) => {
  const customer = await upsertStripeCustomer(user);

  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id
  });

  const subscription = subscriptions.data[0];
  const tier = getTierNameFromSubscription(subscription);
  const key = getSubscriptionPermissionsKey(tier);

  return {
    key,
    tier,
    customer,
    subscription
  };
};

export const getStripeDetailsNoCreate = async (user?: User) => {
  const customer = await findStripeCustomer(user);

  if (!customer) {
    return {
      tier: defaultTier,
      key: getSubscriptionPermissionsKey(defaultTier)
    };
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customer.id
  });

  const subscription = subscriptions.data[0];
  const tier = getTierNameFromSubscription(subscription);
  const key = getSubscriptionPermissionsKey(tier);

  return {
    key,
    tier,
    customer,
    subscription
  };
};

export async function getCustomerEmail(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer
) {
  let customerData: Stripe.Customer | Stripe.DeletedCustomer;

  if (typeof customer === 'string') {
    customerData = await stripe.customers.retrieve(customer);
  } else {
    customerData = customer;
  }

  if (customerData.deleted) {
    throw new Error('Customer was deleted');
  }

  const email = customerData.email;

  if (!email) {
    throw new Error('Customer email not found');
  }

  return email;
}
