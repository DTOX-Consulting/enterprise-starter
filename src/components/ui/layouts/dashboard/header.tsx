import Image from 'next/image';
import Link from 'next/link';

import defaultUser from '@/assets/images/default-user.png';
import icon from '@/assets/images/logo.png';
import { FadeIn } from '@/components/animations/fade-in';
import { ModeToggle } from '@/components/ui/molecules/mode-toggle';
import { NotificationDrawer } from '@/components/ui/molecules/notification-drawer';
import { routes } from '@/config/navigation';
import { authenticationRedirection } from '@/lib/auth/redirect';

import type { PropsWithChildren } from 'react';

function Logo() {
  return (
    <div className="absolute left-16 flex py-4 sm:left-0 sm:w-full md:hidden">
      <Link href={routes.dashboard} className="flex w-full items-center justify-center">
        <Image src={icon} alt="logo" width={140} height={40} className="mr-4" />
      </Link>
    </div>
  );
}

const User = async () => {
  const auth = await authenticationRedirection();

  if (!auth) {
    return (
      <div className="ml-auto flex">
        <ModeToggle />
      </div>
    );
  }

  const { user, token } = auth;

  return (
    <div className="ml-auto flex items-center justify-center">
      <div className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
        <NotificationDrawer seeAllRoute={routes.comingSoon} />
      </div>

      <Link href={routes.account} className="ml-6 flex flex-row items-center">
        <Image
          width={40}
          height={40}
          alt="Profile"
          src={user.picture ?? defaultUser}
          className="size-10 rounded-full border bg-gray-200"
        />
        <span className="ml-2 hidden flex-col md:flex">
          <span className="w-32 truncate font-semibold leading-none tracking-wide">
            {user.given_name} {user.family_name}
          </span>
          <span className="mt-1 w-32 truncate text-xs leading-none text-gray-500">
            {token.roles?.map((role) => role.name).join(', ')}{' '}
            {token.org_name ? `@ ${token.org_name}` : ''}
          </span>
        </span>
      </Link>
      <div className="relative -top-1 flex">
        <ModeToggle />
      </div>
    </div>
  );
};

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <FadeIn>
      <header className="sticky top-0 z-10 flex h-16 w-full grow items-center justify-between border-b border-gray-200 p-4">
        <div className="flex w-full flex-row items-center">
          {children}
          <Logo />
          <User />
        </div>
      </header>
    </FadeIn>
  );
};
