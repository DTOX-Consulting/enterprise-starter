'use client';

import { G } from '@mobily/ts-belt';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Tip } from '@/components/ui/atoms/tooltip';
import { SidebarContent } from '@/components/ui/layouts/dashboard/sidebar-content';
import { useAbilities } from '@/config/permissions/use-abilities';
import { useForceState } from '@/lib/hooks/use-force-rerender';
import { useAtom } from '@/lib/state/atoms';
import { cn } from '@/lib/utils';
import { triggerElementAction } from '@/lib/utils/dom';
import { danglingPromise } from '@/lib/utils/promise';

import type { NavigationProps } from '@/config/navigation/use-navigation';
import type { SessionUser } from '@/lib/sdks/kinde/api/session';

export function SidebarLinks({
  user,
  className,
  navigationProps,
  contentClassName
}: {
  user?: SessionUser;
  className?: string;
  contentClassName?: string;
  navigationProps: NavigationProps;
}) {
  let bottomValue = 0;
  const { tier } = useAbilities();

  const activeParent = navigationProps.getActiveParent()?.name;

  return navigationProps.items.map((item) => {
    if (G.isNotNullable(item.authenticated) && !user) return null;
    if (G.isNotNullable(item.unauthenticated) && G.isNotNullable(user)) return null;
    if (G.isNotNullable(item.bottom)) bottomValue = bottomValue === 0 ? 4 : bottomValue + 10;
    const bottomClass = `bottom-${bottomValue}`;

    if (item.tier && item.tier !== tier) return null;

    return (
      <SidebarLink
        key={item.name}
        {...{ item, bottomClass, user, className, contentClassName, navigationProps, activeParent }}
      />
    );
  });
}

function SidebarLink({
  item,
  user,
  className,
  bottomClass,
  activeParent,
  navigationProps,
  contentClassName
}: Readonly<{
  user?: SessionUser;
  className?: string;
  bottomClass: string;
  activeParent?: string;
  contentClassName?: string;
  navigationProps: NavigationProps;
  item: NavigationProps['items'][0];
}>) {
  const [isMinimized] = useAtom('sidebarMinimizedAtom');
  const [isOpen, setIsOpen] = useForceState(item.name === activeParent);

  return (
    <li
      key={item.name}
      className={cn(G.isNotNullable(item.bottom) && item.bottom ? `${bottomClass} absolute w-full pr-12 md:pr-8` : '')}
    >
      <Tip content={isMinimized ? item.name : ''} className="w-full">
        <Link
          href={item.href}
          onClick={(event) => {
            navigationProps.setActive(item.name);
            if (Boolean(item.disabled) || Boolean(item.isAccordion)) {
              event.preventDefault();
            }
            if (item.items) {
              setIsOpen(!isOpen, true);
            } else {
              danglingPromise(triggerElementAction('click', 'button', '.absolute.right-4.top-4'));
            }
          }}
          className={cn(
            'flex	h-16 flex-row items-center whitespace-nowrap rounded-r-md border-l-2 border-transparent px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-700',
            className,
            {
              'h-10': item.bottom,
              'rounded-full border-2': isMinimized,
              'mx-0 h-10': navigationProps.isSubLink,
              'bg-gray-100 text-gray-700 dark:text-gray-700': navigationProps.isActive(item),
              'px-0': isMinimized && navigationProps.isSubLink
            }
          )}
        >
          {item.icon ? <item.icon className="size-5" /> : null}

          {!isMinimized && (
            <>
              <span className="ml-4">{item.name}</span>
              {item.items && (
                isOpen ? (
                  <ChevronDownIcon className="ml-auto size-5" />
                ) : (
                  <ChevronRightIcon className="ml-auto size-5" />
                )
              )}
            </>
          )}
        </Link>
      </Tip>

      {item.items && isOpen && (
        <SidebarContent
          user={user}
          linksClassName={className}
          className={contentClassName}
          showWorkspaceSwitcher={false}
          navigationProps={{
            ...navigationProps,
            items: item.items,
            isSubLink: true
          }}
        />
      )}
    </li>
  );
}
