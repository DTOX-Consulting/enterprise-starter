'use client';

import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { createRef, useEffect } from 'react';

export default function AutoRedirect({ logout }: { logout?: boolean }) {
  const loginRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    const loginLink = loginRef.current?.firstChild as HTMLAnchorElement;
    loginLink?.click();
  }, [loginRef]);

  return (
    <button type="button" ref={loginRef} className="hidden">
      {logout ? <LogoutLink>*</LogoutLink> : <LoginLink>*</LoginLink>}
    </button>
  );
}
