import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/lib/auth/session';

export default async function AuthPage() {
  const user = await getCurrentUser();

  // redirect to home if user is already logged in
  if (user) {
    redirect('/');
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center space-y-4 py-10">
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
  );
}
