'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';

export function HeaderContainer({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const brightness = pathname === '/' ? 'brightness-80' : 'brightness-100';

  return (
    <header
      className={cn(
        // 'sticky border-b',
        brightness,
        'fixed border-b-0',
        'top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl'
      )}
    >
      {children}
    </header>
  );
}
