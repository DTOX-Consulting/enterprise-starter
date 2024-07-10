import { redirect } from 'next/navigation';

import { routes, apiRoutes } from '@/config/navigation/routes';
import { generateRoutes } from '@/lib/auth/utils';
import { isUserAuthenticated } from '@/lib/sdks/kinde/api/session';

export default async function LoginPage() {
  const authCheck = await isUserAuthenticated();

  if (authCheck) {
    redirect(routes.dashboard);
  }

  const redirectPath = generateRoutes(routes.authCallback).generated.url ?? routes.dashboard;
  redirect(`${apiRoutes.auth.login}?post_login_redirect_url=${redirectPath}`);
}
