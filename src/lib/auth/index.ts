import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type NextAuthOptions } from 'next-auth';
import EmailAuthProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { Client } from 'postmark';

import { siteConfig } from '@/config/site';
import { db } from '@/lib/db/prisma';
import { getEnv } from '@/lib/env';

const postmarkClient = new Client(getEnv('POSTMARK_API_TOKEN'));

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getEnv('GOOGLE_CLIENT_ID', ''),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET', '')
    }),
    EmailAuthProvider({
      from: getEnv('SMTP_FROM'),
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier
          },
          select: {
            emailVerified: true
          }
        });

        const templateId = user?.emailVerified
          ? getEnv('POSTMARK_SIGN_IN_TEMPLATE')
          : getEnv('POSTMARK_ACTIVATION_TEMPLATE');
        if (!templateId) {
          throw new Error('Missing template id');
        }

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(templateId),
          To: identifier,
          From: provider.from,
          TemplateModel: {
            action_url: url,
            product_name: siteConfig.name
          },
          Headers: [
            {
              // Set this to prevent Gmail from threading emails.
              // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
              Name: 'X-Entity-Ref-ID',
              Value: new Date().getTime() + ''
            }
          ]
        });

        if (result.ErrorCode) {
          throw new Error(result.Message);
        }
      }
    })
  ],
  callbacks: {
    session({ token, session }) {
      if (token as typeof token | undefined) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!dbUser) {
        if (user as typeof user | undefined) {
          token.id = user?.id;
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
