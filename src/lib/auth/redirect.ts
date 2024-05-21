import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { props } from 'already';
import { redirect, RedirectType } from 'next/navigation';

import { getFFValue } from '@/config/feature-flags';
import { routes } from '@/config/navigation';

import type { KindeAccessToken, KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

interface AuthenticationRedirection {
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
    authenticated: routes.dashboard,
    unauthenticated: routes.login
  }
};

export async function authenticationRedirection(
  authArgs: AuthenticationRedirection = defaultARArgs
) {
  const args = Object.assign({}, defaultARArgs, authArgs);

  const { isAuthenticated, getUser, getAccessToken } = getKindeServerSession();
  const authCheck = await isAuthenticated();

  const redirectType = args.replace ? RedirectType.replace : RedirectType.push;

  if (!authCheck && getFFValue('NEEDS_AUTH')) {
    redirect(args.redirectPaths.unauthenticated, redirectType);
  }

  if (!authCheck && !getFFValue('NEEDS_AUTH') && args.redirectWhenAuthenticated) {
    redirect(args.redirectPaths.authenticated, redirectType);
  }

  if (authCheck && args.redirectWhenAuthenticated) {
    redirect(args.redirectPaths.authenticated, redirectType);
  }

  return authCheck
    ? ((await props({
        user: getUser(),
        token: getAccessToken()
      })) as {
        user: KindeUser;
        token: KindeAccessToken;
      })
    : null;
}

export type AuthRedirectResponse = Awaited<ReturnType<typeof authenticationRedirection>>;
