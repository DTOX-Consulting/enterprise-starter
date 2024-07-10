import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { Button } from '@/components/ui/atoms/button';
import { isUserAuthenticated } from '@/lib/sdks/kinde/api/session';

export default async function AuthPage() {
  const authCheck = await isUserAuthenticated();

  if (authCheck) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4 py-10">
        <Button>
          <LogoutLink>Log out</LogoutLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 py-10">
      <Button>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
    </div>
  );
}
