import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { type AvailablePermissions, defaultPermissions } from '@/lib/auth/permissions';

// import { getServerSession } from 'next-auth/next';

// import { authOptions } from '@/lib/auth';

// export async function getSession() {
//   return getServerSession(authOptions);
// }

export async function getSession() {
  const { getUser } = getKindeServerSession();
  const { permissions } = await getPermissions();
  const user = await getUser();
  return { user, permissions };
}

export async function getCurrentUser() {
  const session = await getSession();
  return session.user;
}

async function getPermissions() {
  const { getPermissions: getKindePermissions } = getKindeServerSession();
  const permissions = (await getKindePermissions()) ?? defaultPermissions;
  return { permissions: permissions as AvailablePermissions[] };
}
