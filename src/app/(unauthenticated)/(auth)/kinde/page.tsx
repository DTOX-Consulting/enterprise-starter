import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { Button } from '@/components/ui/atoms/button';

export default async function AuthPage() {
  const { isAuthenticated } = getKindeServerSession();
  const authCheck = await isAuthenticated();

  if (authCheck) {
    return (
      <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center space-y-4 py-10">
        <Button>
          <LogoutLink>Log out</LogoutLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center space-y-4 py-10">
      <Button>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </div>
  );
}
