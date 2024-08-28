'use client';

import { Menu } from 'lucide-react';

import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/atoms/button';
import { Separator } from '@/components/ui/atoms/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/atoms/sheet';
import { Logo, LogoWithMinimizer } from '@/components/ui/layouts/dashboard/logo';
import { SidebarDesktopWrapper } from '@/components/ui/layouts/dashboard/sidebar-desktop-wrapper';
import { SidebarLinks } from '@/components/ui/layouts/dashboard/sidebar-links';
import { OrganizationSwitcher as WorkspaceSwitcher } from '@/components/ui/layouts/dashboard/switcher-navigation';
import { UserMenu } from '@/components/ui/organisms/user/menu';
import { useNavigation, type NavigationProps } from '@/config/navigation/use-navigation';
import { useAtom } from '@/lib/state/atoms';
import { cn } from '@/lib/utils';

import type { User } from '@/lib/sdks/kinde/api/session';
import type { PropsWithChildren } from 'react';

export function SidebarDesktop({
  user,
  children,
  sidebarWidth
}: PropsWithChildren & { sidebarWidth?: number; user?: User }) {
  const navigationProps = useNavigation();

  return (
    <SidebarDesktopWrapper sidebarWidth={sidebarWidth}>
      <LogoWithMinimizer navigationProps={navigationProps} />
      <SidebarContent
        user={user}
        noMinimize={false}
        showUserMenu={true}
        showWorkspaceSwitcher={false}
        navigationProps={navigationProps}
      />
      {children}
    </SidebarDesktopWrapper>
  );
}

export function SidebarMobile({ user, children }: PropsWithChildren & { user?: User }) {
  const navigationProps = useNavigation();

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-2 top-3 z-20 md:hidden">
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col">
        <SheetHeader>
          <SheetTitle>
            <Logo className="pt-0" navigationProps={navigationProps} />
            <Separator className="mb-4" />
          </SheetTitle>
        </SheetHeader>
        <FadeIn className="flex h-full flex-col">
          <SidebarContent
            user={user}
            noMinimize={true}
            showUserMenu={true}
            showWorkspaceSwitcher={false}
            navigationProps={navigationProps}
          />
          {children}
        </FadeIn>
      </SheetContent>
    </Sheet>
  );
}

export function SidebarContent({
  user,
  className,
  noMinimize,
  showUserMenu,
  linksClassName,
  navigationProps,
  showWorkspaceSwitcher
}: {
  user?: User;
  className?: string;
  noMinimize?: boolean;
  showUserMenu?: boolean;
  linksClassName?: string;
  showWorkspaceSwitcher?: boolean;
  navigationProps: NavigationProps;
}) {
  const [isMinimized] = useAtom('sidebarMinimizedAtom');

  return (
    <div
      className={cn('flex h-full flex-col p-0 md:px-4 md:pb-4', className, {
        'md:px-0': isMinimized
      })}
    >
      <ul
        className={cn('flex w-full flex-col', {
          'items-center': isMinimized
        })}
      >
        {showWorkspaceSwitcher && (
          <li className="mb-4">
            <WorkspaceSwitcher />
          </li>
        )}
        <SidebarLinks
          user={user}
          className={linksClassName}
          contentClassName={className}
          navigationProps={navigationProps}
        />
      </ul>

      {showUserMenu && (
        <>
          <div className="flex grow" />
          <UserMenu user={user} noMinimize={noMinimize} />
        </>
      )}
    </div>
  );
}
