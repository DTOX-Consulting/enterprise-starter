'use server';

import { RedirectType } from 'next/navigation';

import { routes } from '@/config/navigation/routes';
import { getFFValue } from '@/config/permissions/feature-flags';
import { generateRoutes, redirect } from '@/lib/auth/utils';
import { isUserAuthenticated } from '@/lib/sdks/kinde/api/session';

type AuthenticationRedirection = {
  replace?: boolean;
  redirectWhenAuthenticated?: boolean;
  redirectPaths?: {
    authenticated: string;
    unauthenticated: string;
  };
}

const defaultARArgs = {
  replace: false,
  redirectWhenAuthenticated: false,
  redirectPaths: {
    authenticated: routes.businesses, // routes.dashboard
    unauthenticated: routes.login
  }
};

export async function authenticationRedirection(
  authArgs: AuthenticationRedirection = defaultARArgs
) {
  const currentPath = generateRoutes().current.path;

  const args = { ...defaultARArgs, ...authArgs};

  const authCheck = await isUserAuthenticated();

  const redirectType = args.replace ? RedirectType.replace : RedirectType.push;

  let pathOrUrl = '';

  if (!authCheck && getFFValue('NEEDS_AUTH')) {
    pathOrUrl = `${args.redirectPaths.unauthenticated}?next=${currentPath}`;
  }

  if (!authCheck && !getFFValue('NEEDS_AUTH') && args.redirectWhenAuthenticated) {
    pathOrUrl = args.redirectPaths.unauthenticated;
  }

  if (authCheck && args.redirectWhenAuthenticated) {
    pathOrUrl = args.redirectPaths.authenticated;
  }

  if (pathOrUrl) {
    redirect({ pathOrUrl, redirectType });
  }
}
