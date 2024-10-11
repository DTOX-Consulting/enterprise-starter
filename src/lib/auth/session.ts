import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getServerSession as getNextAuthServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

export async function getServerSession() {
  return getNextAuthServerSession(authOptions);
}

export async function getSession() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return { user };
}

export async function getCurrentUser() {
  const session = await getSession();
  return session.user;
}
