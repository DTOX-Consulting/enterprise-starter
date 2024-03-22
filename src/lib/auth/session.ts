import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { getServerSession } from 'next-auth/next';

// import { authOptions } from '@/lib/auth';

// export async function getSession() {
//   return getServerSession(authOptions);
// }

export async function getSession() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return { user };
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
