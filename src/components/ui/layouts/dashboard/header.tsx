import Image from 'next/image';
import Link from 'next/link';

import icon from '@/assets/images/logo.png';
import { FadeIn } from '@/components/animations/fade-in';
import { NotificationToggle } from '@/components/ui/layouts/dashboard/notification';
import { SwitcherNavigation } from '@/components/ui/layouts/dashboard/switcher-navigation';
import { ThemeToggleMenuHeader as ThemeToggleMenu } from '@/components/ui/molecules/theme-toggle';
import { UserImageSession } from '@/components/ui/organisms/user/image';
import { routes } from '@/config/navigation/routes';

import type { PropsWithChildren } from 'react';

function Logo() {
  return (
    <div className="ml-10 flex py-4 sm:ml-0 sm:w-full md:hidden">
      <Link href={routes.dashboard} className="flex w-full items-center justify-center">
        <Image src={icon} alt="logo" width={140} height={40} className="mr-4" />
      </Link>
    </div>
  );
}

function Switcher() {
  return (
    <div className="ml-10 flex py-4 md:relative md:ml-0">
      <SwitcherNavigation />
    </div>
  );
}

export type HeaderProps = {
  showUser?: boolean;
  showThemeToggle?: boolean;
  showNotifications?: boolean;
  showSwitcherNavigation?: boolean;
};

const InternalHeader = ({
  showUser = true,
  showThemeToggle = true,
  showNotifications = true,
  showSwitcherNavigation = false
}: HeaderProps) => (
  <>
    {showSwitcherNavigation ? <Switcher /> : <Logo />}
    <div className="ml-auto flex items-center justify-center space-x-2">
      {showNotifications && <NotificationToggle />}
      {showUser && <UserImageSession className="max-w-24" link={true} />}
      <div className="relative -top-1 flex">{showThemeToggle && <ThemeToggleMenu />}</div>
    </div>
  </>
);

export const Header = ({ children, ...headerProps }: PropsWithChildren<HeaderProps>) => (
  <FadeIn>
    <header className="sticky top-0 z-10 flex h-16 w-full grow items-center justify-between border-b border-gray-2 p-4">
      <div className="flex w-full flex-row items-center">
        {children}
        <InternalHeader {...headerProps} />
      </div>
    </header>
  </FadeIn>
);
