import { TRPCError } from '@trpc/server';
import { unbox } from 'unbox-js';

import { db } from '@/lib/db/prisma';
import { logger } from '@/lib/logger/console';
import { getOrUpsertContact, upsertContact } from '@/lib/sdks/hubspot';
import { setPermission } from '@/lib/sdks/kinde/api/permissions';
import { getUserSession } from '@/lib/sdks/kinde/api/session';
import { getStripeDetailsNoCreate } from '@/lib/sdks/stripe/server/utils';
import { isDeepEqual } from '@/lib/utils/deep-equal';
import { publicProcedure } from '@/trpc';

const addToKinde = true;
const addToHubspot = true;
const addToDatabase = false;

export const authRouter = {
  ping: publicProcedure.query(() => {
    return { success: true };
  }),
  pingError: publicProcedure.query(() => {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'This is a test error' });
  }),
  callback: publicProcedure.query(async () => {
    const { user, subscription } = await getUserSession();
    const { data: stripeDetails } = await unbox(getStripeDetailsNoCreate(user));

    const subscriptionKey = stripeDetails?.key ?? subscription.key;

    if (addToKinde) {
      logger.info('Setting Permissions', {
        email: user.email,
        subscriptionKey,
        stripeDetails,
        subscription
      });
      await setPermission(user.email, subscriptionKey);
    }

    if (addToHubspot) {
      const data = await getOrUpsertContact({
        notifyMe: false,
        email: user.email,
        lastname: user.lastName,
        firstname: user.firstName,
        subscriptionPlan: subscriptionKey
      });

      const newData = {
        email: user.email,
        lastname: user.lastName,
        firstname: user.firstName,
        notifyMe: data?.notifyMe ?? false,
        subscriptionPlan: subscriptionKey
      };

      if (!isDeepEqual(data, newData)) {
        await upsertContact(newData);
      }
    }

    if (addToDatabase) {
      // check if the user is in the database
      const dbUser = await db.user.findFirst({
        where: {
          id: user.id
        }
      });

      if (!dbUser) {
        // create user in db
        await db.user.create({
          data: user
        });
      }
    }

    return { success: true };
  }),
  user: publicProcedure.query(async () => {
    return getUserSession();
  })
};
