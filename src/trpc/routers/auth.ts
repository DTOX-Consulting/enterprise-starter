import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';

import { db } from '@/lib/db/prisma';
import { publicProcedure } from '@/trpc';

export const authRouter = {
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    console.log(user);

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
  })
};
