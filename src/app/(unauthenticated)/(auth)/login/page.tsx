import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

import AutoRedirect from '@/components/ui/molecules/auto-redirect';
import { routes } from '@/config/navigation';

export default async function LoginPage() {
  const { isAuthenticated } = getKindeServerSession();
  const authCheck = await isAuthenticated();

  if (authCheck) {
    redirect(routes.dashboard);
  }

  return <AutoRedirect />;
}
