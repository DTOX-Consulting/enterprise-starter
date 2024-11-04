import { TRPCError } from '@trpc/server';
import { unbox } from 'unbox-js';

import { db } from '@/lib/db/prisma';
import { logger } from '@/lib/logger/console';
import { setPermission } from '@/lib/sdks/kinde/api/permissions';
import { getUserSession, type SessionUser } from '@/lib/sdks/kinde/api/session';
import { getStripeDetailsNoCreate } from '@/lib/sdks/stripe/server/utils';
import { getOrUpsertContact, upsertContact } from '@/lib/sdks/wix';
import { isDeepEqual } from '@/lib/utils/deep-equal';
import { publicProcedure } from '@/trpc';

const syncConfig = {
  db: false,
  crm: false,
  auth: false,
  stripe: false
};

type Subscription = {
  key: string;
};

type StripeDetails = {
  key?: string;
};

async function handleStripeDetails(
  user: SessionUser
): Promise<{ data: StripeDetails | undefined }> {
  if (syncConfig.stripe) {
    const result = await unbox(getStripeDetailsNoCreate(user));
    const stripeDetails: StripeDetails = { key: result.data?.key };
    return { data: stripeDetails };
  }
  return { data: undefined };
}

async function handleAuth(
  user: SessionUser,
  subscriptionKey: string,
  stripeDetails: StripeDetails,
  subscription: Subscription
): Promise<void> {
  if (syncConfig.auth) {
    logger.info('Setting Permissions', {
      email: user.email,
      subscriptionKey,
      stripeDetails,
      subscription
    });
    await setPermission(user.email, subscriptionKey);
  }
}

async function handleCRM(user: SessionUser, subscriptionKey: string): Promise<void> {
  if (syncConfig.crm) {
    const data = await getOrUpsertContact({
      notifyMe: false,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      subscriptionPlan: subscriptionKey
    });

    const newData = {
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      notifyMe: data?.notifyMe ?? false,
      subscriptionPlan: subscriptionKey
    };

    if (!isDeepEqual(data, newData)) {
      await upsertContact(newData);
    }
  }
}

async function handleDB(user: SessionUser): Promise<void> {
  if (syncConfig.db) {
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    });

    if (!dbUser) {
      await db.user.create({
        data: user
      });
    }
  }
}

export const authRouter = {
  ping: publicProcedure.query(() => ({ success: true })),
  pingError: publicProcedure.query(() => {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'This is a test error' });
  }),
  callback: publicProcedure.query(async () => {
    const { user, subscription } = await getUserSession();

    const { data: stripeDetails } = await handleStripeDetails(user);
    const subscriptionKey = stripeDetails?.key ?? subscription.key;

    const defaultStripeDetails: StripeDetails = { key: '' };

    await handleAuth(user, subscriptionKey, stripeDetails ?? defaultStripeDetails, subscription);
    await handleCRM(user, subscriptionKey);
    await handleDB(user);

    return { success: true };
  }),
  user: publicProcedure.query(async () => getUserSession(true))
};
