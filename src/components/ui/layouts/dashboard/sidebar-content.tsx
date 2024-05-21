'use client';

import { ChevronDownIcon, ChevronRightIcon, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import icon from '@/assets/images/logo.png';
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
import { SidebarDesktopWrapper } from '@/components/ui/layouts/dashboard/sidebar-desktop-wrapper';
import { WorkspaceSwitcher } from '@/components/ui/layouts/dashboard/workspace-switcher';
import { SubscriptionBadge } from '@/components/ui/molecules/subscription-badge';
import { routes } from '@/config/navigation';
import { useForceState } from '@/lib/hooks/use-force-rerender';
import { useNavigation, type NavigationProps } from '@/lib/hooks/use-navigation';
import { cn } from '@/lib/utils';

import type { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import type { PropsWithChildren } from 'react';

export function SidebarDesktop({
  user,
  children,
  sidebarWidth
}: PropsWithChildren & { sidebarWidth?: number; user?: KindeUser }) {
  const navigationProps = useNavigation();

  return (
    <SidebarDesktopWrapper sidebarWidth={sidebarWidth}>
      <Logo />
      <SidebarContent user={user} showWorkspaceSwitcher={true} navigationProps={navigationProps} />
      {children}
    </SidebarDesktopWrapper>
  );
}

export function SidebarMobile({ user, children }: PropsWithChildren & { user?: KindeUser }) {
  const navigationProps = useNavigation();

  return (
    <Sheet>
      <SheetTrigger asChild className="absolute left-2 top-3 z-20 md:hidden">
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo className="pt-0" />
            <Separator className="mb-4" />
          </SheetTitle>
        </SheetHeader>
        <FadeIn className="h-full">
          <SidebarContent
            user={user}
            showWorkspaceSwitcher={true}
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
  linksClassName,
  navigationProps,
  showWorkspaceSwitcher
}: {
  user?: KindeUser;
  className?: string;
  linksClassName?: string;
  showWorkspaceSwitcher?: boolean;
  navigationProps: NavigationProps;
}) {
  return (
    <div className={cn('h-full p-0 md:px-4 md:py-6', className)}>
      <ul className="flex w-full flex-col">
        {showWorkspaceSwitcher && (
          <li className="my-px mb-8">
            <WorkspaceSwitcher />
          </li>
        )}
        <Links
          user={user}
          className={linksClassName}
          contentClassName={className}
          navigationProps={navigationProps}
        />
      </ul>
    </div>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center py-4', className)}>
      <div className="inline-flex">
        <Link href={routes.dashboard} className="ml-4 inline-flex flex-row">
          <Image src={icon} alt="logo" width={140} height={40} className="mr-4" />
          <SubscriptionBadge>Free</SubscriptionBadge>
        </Link>
      </div>
    </div>
  );
}

function Links({
  user,
  className,
  navigationProps,
  contentClassName
}: {
  user?: KindeUser;
  className?: string;
  contentClassName?: string;
  navigationProps: NavigationProps;
}) {
  let bottomValue = 0;

  return navigationProps.items.map((item, idx) => {
    if (item.authenticated && !user) return null;
    if (item.unauthenticated && user) return null;

    if (item.bottom) bottomValue = bottomValue === 0 ? 4 : bottomValue + 10;
    const bottomClass = `bottom-${bottomValue}`;

    return (
      <LinkOfLinks
        key={item.name}
        {...{ idx, item, bottomClass, user, className, contentClassName, navigationProps }}
      />
    );
  });
}

function LinkOfLinks({
  idx,
  item,
  bottomClass,
  user,
  className,
  navigationProps,
  contentClassName
}: {
  idx: number;
  bottomClass: string;
  item: NavigationProps['items'][0];
  user?: KindeUser;
  className?: string;
  contentClassName?: string;
  navigationProps: NavigationProps;
}) {
  const [isOpen, setIsOpen] = useForceState(item.items && idx === 0);

  return (
    <li
      key={item.name}
      className={cn('my-px', item.bottom ? `${bottomClass} absolute w-full pr-12 md:pr-8` : '')}
    >
      <Link
        href={item.href}
        onClick={(e) => {
          (item.disabled ?? item.isAccordion) && e.preventDefault();
          item.items && setIsOpen(!isOpen, true);
          navigationProps.setActive();
          closeSidebar();
        }}
        className={cn(
          'flex h-16 flex-row items-center rounded-r-md border-l-2 border-transparent px-3 text-gray-500 hover:border-l-pulse hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-700',
          className,
          {
            'h-10': item.bottom,
            'mx-0 -mr-8 h-10': navigationProps.isSublink,
            'border-l-pulse': navigationProps.isActive(item),
            'bg-gray-100 text-gray-700 dark:text-gray-700': navigationProps.isActive(item)
          }
        )}
      >
        {item.icon ? <item.icon className="size-5" /> : null}
        <span className="ml-6">{item.name}</span>
        {!item.items ? null : isOpen ? (
          <ChevronDownIcon className="ml-auto size-5" />
        ) : (
          <ChevronRightIcon className="ml-auto size-5" />
        )}
      </Link>

      {item.items && isOpen && (
        <SidebarContent
          user={user}
          linksClassName={className}
          className={contentClassName}
          showWorkspaceSwitcher={false}
          navigationProps={{
            ...navigationProps,
            items: item.items,
            isSublink: true
          }}
        />
      )}
    </li>
  );
}

const closeSidebar = () => {
  const sidebarTrigger = document.getElementById('sheetClose');
  sidebarTrigger?.click();
};
