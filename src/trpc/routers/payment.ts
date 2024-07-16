import { z } from 'zod';

import { logger } from '@/lib/logger/console';
import {
  createStripeLineItems,
  getStripeAmount,
  getStripeUrls
} from '@/lib/sdks/stripe/client/utils';
import { stripe } from '@/lib/sdks/stripe/server/auth';
import { getStripeDetails } from '@/lib/sdks/stripe/server/utils';
import { protectedProcedure } from '@/trpc';

import type { TierName } from '@/config/permissions/features';
import type { Tuple } from '@/lib/types';

const tierEnum = z.enum<TierName, Tuple<TierName>>(['starter', 'pro', 'team']);

export const paymentRouter = {
  createIntent: protectedProcedure
    .input(
      z.object({
        tier: tierEnum
      })
    )
    .query(async ({ input, ctx }) => {
      const { tier } = input;
      const { user } = ctx.session;

      const intent = await stripe.paymentIntents.create({
        receipt_email: user.email ?? undefined,
        amount: getStripeAmount(tier),
        currency: 'GBP'
      });

      return { intent };
    }),
  subscribe: protectedProcedure
    .input(
      z.object({
        tier: tierEnum
      })
    )
    .mutation(async ({ input }) => {
      const { tier } = input;
      const { customer, subscription } = await getStripeDetails();

      if (subscription) {
        logger.info('Subscription already exists', { customer, subscription });
        return {
          customer,
          subscription,
          hasSubscription: true
        };
      }

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customer.id,
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        cancel_url: getStripeUrls().returnUrl,
        success_url: getStripeUrls().returnUrl,
        line_items: createStripeLineItems(tier),
        customer_update: {
          name: 'auto',
          address: 'auto',
          shipping: 'auto'
        }
      });

      logger.info('Subscription session created', { customer, session });

      return {
        session,
        customer,
        subscription,
        hasSubscription: false
      };
    }),
  manageSubscription: protectedProcedure.mutation(async () => {
    const { customer, subscription } = await getStripeDetails();

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const billing = await stripe.billingPortal.sessions.create({
      return_url: getStripeUrls().returnUrl,
      customer: customer.id
    });

    const hasSubscription = subscription.status === 'active';

    return {
      billing,
      customer,
      subscription,
      hasSubscription
    };
  }),
  getSubscription: protectedProcedure.query(async () => {
    const { subscription } = await getStripeDetails();

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    return {
      subscription
    };
  }),
  cancelSubscription: protectedProcedure.mutation(async () => {
    const { subscription } = await getStripeDetails();

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    await stripe.subscriptions.cancel(subscription.id);
    return { success: true };
  })
};
