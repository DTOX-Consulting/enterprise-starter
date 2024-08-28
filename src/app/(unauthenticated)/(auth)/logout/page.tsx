import { redirect } from 'next/navigation';

import { routes, apiRoutes } from '@/config/navigation/routes';
import { isUserAuthenticated } from '@/lib/sdks/kinde/api/session';

export default async function LogoutPage() {
  const authCheck = await isUserAuthenticated();

  if (!authCheck) {
    redirect(routes.login);
  }

  redirect(`${apiRoutes.auth.logout}`);
}
