'use client';

import { PanelRightOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo.png';
import { SubscriptionBadge } from '@/components/ui/molecules/subscription-badge';
import { routes } from '@/config/navigation/routes';
import { getTierLabel } from '@/config/permissions/features';
import { useAbilities } from '@/config/permissions/use-abilities';
import { useAtom } from '@/lib/state/atoms';
import { cn } from '@/lib/utils';

import type { NavigationProps } from '@/config/navigation/use-navigation';

import icon from '@/assets/images/icon.png';

function SidebarMinimizer() {
  const [isMinimized, setMinimized] = useAtom('sidebarMinimizedAtom');

  if (isMinimized) {
    return null;
  }

  return (
    <>
      <div className="flex grow" />
      <PanelRightOpen
        onClick={() => setMinimized(!isMinimized)}
        className={cn('mr-4 size-5 cursor-pointer hover:text-gray-500', { hidden: isMinimized })}
      />
    </>
  );
}

export function Logo({
  className,
  navigationProps
}: { className?: string; showMinimizer?: boolean; navigationProps: NavigationProps }) {
  const { tier, abilitiesReady } = useAbilities();

  return (
    <div className={cn('flex items-center py-4', className)}>
      <div className="inline-flex">
        <Link
          href={routes.dashboard}
          className="ml-4 inline-flex flex-row"
          onClick={() => navigationProps.removeActive()}
        >
          <Image src={logo} alt="logo" width={140} height={40} className="mr-4" />
        </Link>
        {abilitiesReady && <SubscriptionBadge>{getTierLabel(tier)}</SubscriptionBadge>}
      </div>
    </div>
  );
}

export function LogoWithMinimizer({
  className,
  navigationProps
}: { className?: string; showMinimizer?: boolean; navigationProps: NavigationProps }) {
  const { tier, abilitiesReady } = useAbilities();
  const [isMinimized, setMinimized] = useAtom('sidebarMinimizedAtom');

  return (
    <div className={cn('flex items-center py-4', className)}>
      <div className="inline-flex">
        <Link
          href={routes.dashboard}
          className="ml-4 inline-flex flex-row"
          onClick={(e) => {
            if (isMinimized) {
              e.preventDefault();
              setMinimized(!isMinimized);
              return;
            }

            navigationProps.removeActive();
          }}
        >
          <Image
            priority
            alt="logo"
            height={40}
            width={isMinimized ? 40 : 140}
            src={isMinimized ? icon : logo}
            className="translate-all mr-4 duration-300 ease-in-out"
          />
        </Link>
        {abilitiesReady && !isMinimized && (
          <SubscriptionBadge>{getTierLabel(tier)}</SubscriptionBadge>
        )}
      </div>
      <SidebarMinimizer />
    </div>
  );
}
