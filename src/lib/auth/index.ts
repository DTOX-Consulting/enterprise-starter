import { PrismaAdapter as prismaAdapter } from '@next-auth/prisma-adapter';
import emailAuthProvider from 'next-auth/providers/email';
import googleProvider from 'next-auth/providers/google';

import { db } from '@/lib/db/prisma';
import { getEnv } from '@/lib/env';
import { config } from '@/lib/sdks/sendgrid/config';
import { send } from '@/lib/sdks/sendgrid/send';

import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: prismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    googleProvider({
      clientId: getEnv('GOOGLE_CLIENT_ID', ''),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET', '')
    }),
    emailAuthProvider({
      from: config.emails.noreply.email,
      sendVerificationRequest: async ({ identifier }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier
          },
          select: {
            emailVerified: true
          }
        });

        if (!user?.emailVerified) {
          await send({
            email: identifier,
            templateKey: 'emailVerification',
            dynamicTemplateData: {
              name: 'User',
              company: 'Pulse'
            }
          });

          return;
        }

        await send({
          email: identifier,
          templateKey: 'welcome',
          dynamicTemplateData: {
            name: 'User',
            company: 'Pulse'
          }
        });
      }
    })
  ],
  callbacks: {
    session({ token, session }) {
      if (token as typeof token | undefined) {
        session.user = session.user ?? {};
        session.user = {
          ...session.user,
          ...token
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: user.email
        }
      });

      if (!dbUser) {
        if (user as typeof user | undefined) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      };
    }
  }
};
