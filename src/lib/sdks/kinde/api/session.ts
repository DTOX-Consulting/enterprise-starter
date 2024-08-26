'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import { routes } from '@/config/navigation/routes';
import {
  convertPermissionsToArray,
  getTierNameFromPermissionsKey,
  getSubscriptionPermissionsKeyFromPermissions
} from '@/config/permissions/features';
import { logger } from '@/lib/logger';
import { isAdminUser } from '@/lib/sdks/kinde/admin';
import { getPermissions } from '@/lib/sdks/kinde/api/permissions';
import { props } from '@/lib/utils/promise';

export const getUserSession = async (throwError?: boolean) => {
  const {
    getUser,
    getIdTokenRaw,
    refreshTokens,
    getAccessToken,
    getOrganization,
    isAuthenticated
  } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    logger.error('User not found', { user, throwError });

    if (throwError) {
      throw new Error('User not found');
    }

    return redirect(routes.logout);
  }

  const isAdmin = await isAdminUser(user.email);

  const { token, idToken, refreshToken, permissions, organization, authenticated } = await props({
    token: getAccessToken(),
    idToken: getIdTokenRaw(),
    organization: getOrganization(),
    authenticated: isAuthenticated(),
    permissions: getPermissions(user.email),
    refreshToken: refreshTokens() as Promise<string | undefined>
  });

  const convertedRoles = convertPermissionsToArray(permissions.permissions);
  const key = getSubscriptionPermissionsKeyFromPermissions(convertedRoles);
  const tier = getTierNameFromPermissionsKey(convertedRoles);

  return {
    isAdmin,
    organization,
    user: {
      id: user.id,
      email: user.email,
      image: user.picture,
      firstName: user.given_name ?? '',
      lastName: user.family_name ?? '',
      name: `${user.given_name ?? ''} ${user.family_name ?? ''}`.trim()
    },
    subscription: {
      tier,
      key
    },
    auth: {
      token,
      refreshToken,
      authenticated,
      idToken: idToken as typeof idToken | undefined
    }
  };
};

export const isUserAuthenticated = async () => {
  const { isAuthenticated } = getKindeServerSession();
  return isAuthenticated();
};

export type UserSession = Awaited<ReturnType<typeof getUserSession>>;
export type SessionUser = UserSession['user'];
export type User = UserSession['user'];
