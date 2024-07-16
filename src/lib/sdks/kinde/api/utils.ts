import { usersApi } from '@/lib/sdks/kinde/api/client';
import { config } from '@/lib/sdks/kinde/config';

export const getUserByEmail = async (email: string) => {
  const { users } = await usersApi.getUsers({ email });
  const user = users?.[0];

  if (!user || !user.id) throw new Error('User not found');
  return user as NonNullable<typeof user> & { id: string };
};

export const refreshUserClaimsByEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  await usersApi.refreshUserClaims({ userId: user.id });
};

export const getDefaultOrgCode = () => {
  return config.defaultOrgCode;
};
