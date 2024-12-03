'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { G } from '@mobily/ts-belt';
import { redirect } from 'next/navigation';

import { routes } from '@/config/navigation/routes';
import {
  type TierName,
  getTierNameFromPermissionsKey,
  getSubscriptionPermissionsKeyFromPermissions
} from '@/config/permissions/features';
import { logger } from '@/lib/logger';
import { isAdminUser } from '@/lib/sdks/kinde/admin';
import { props } from '@/lib/utils/promise';

import type { KindeAccessToken, KindeOrganization } from '@kinde-oss/kinde-auth-nextjs/types';

type GetUserSession = (throwError?: boolean) => Promise<UserSession>;
export const getUserSession: GetUserSession = async (throwError) => {
  const {
    getUser,
    getIdTokenRaw,
    refreshTokens,
    getAccessToken,
    getOrganization,
    isAuthenticated
  } = getKindeServerSession();
  const user = await getUser();

  if (G.isNullable(user) || G.isNullable(user.id) || G.isNullable(user.email)) {
    logger.error('User not found', { user, throwError });

    if (throwError === true) {
      throw new Error('User not found');
    }

    return redirect(routes.logout);
  }

  const isAdmin = await isAdminUser(user.email);

  const { token, idToken, refreshToken, organization, authenticated } = await props({
    token: getAccessToken(),
    idToken: getIdTokenRaw(),
    refreshToken: refreshTokens(),
    organization: getOrganization(),
    authenticated: isAuthenticated()
  });

  const convertedRoles = [] as string[];
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
      authenticated,
      refreshToken: refreshToken as unknown as string,
      idToken: idToken as typeof idToken | undefined
    }
  };
};

export const isUserAuthenticated = async () => {
  const { isAuthenticated } = getKindeServerSession();
  return isAuthenticated();
};

export type UserSession = {
  isAdmin: boolean;
  organization: KindeOrganization | null;
  user: {
    id: string;
    email: string;
    image?: string | null;
    firstName: string;
    lastName: string;
    name: string;
  };
  subscription: {
    tier: TierName;
    key: string;
  };
  auth: {
    token: KindeAccessToken | undefined;
    refreshToken: string;
    authenticated: boolean;
    idToken?: string;
  };
};

export type SessionUser = UserSession['user'];
