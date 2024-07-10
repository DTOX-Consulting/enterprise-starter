'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/atoms/button';
import { useNavigation } from '@/config/navigation/use-navigation';
import { cn } from '@/lib/utils';

import type { HTMLAttributes } from 'react';

interface SettingsSidebarProps extends HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingsSidebar({ className, items, ...props }: SettingsSidebarProps) {
  const pathname = usePathname();
  const { getActive } = useNavigation();

  const basePath = getActive()?.href;

  console.log('basePath', basePath);

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav
        className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
        {...props}
      >
        {items.map((item) => {
          const href = basePath ? `${basePath}${item.href}` : item.href;
          return (
            <Link
              href={href}
              key={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === href
                  ? 'bg-muted hover:bg-muted'
                  : 'hover:bg-transparent hover:underline',
                'justify-start'
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
