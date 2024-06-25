import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

import { db } from '@/lib/db/prisma';
import { publicProcedure } from '@/trpc';

export const authRouter = {
  ping: publicProcedure.query(() => {
    return { success: true };
  }),
  pingError: publicProcedure.query(() => {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'This is a test error' });
  }),
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) throw new TRPCError({ code: 'UNAUTHORIZED' });

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          name: user.given_name,
          email: user.email,
          image: user.picture
        }
      });
    }

    return { success: true };
  }),
  user: publicProcedure.query(async () => {
    const { getUser, isAuthenticated, getPermissions, getOrganization } = getKindeServerSession();
    const user = await getUser();
    const permissions = await getPermissions();
    const organization = await getOrganization();
    const authenticated = await isAuthenticated();

    return { user, authenticated, permissions, organization };
  })
};
