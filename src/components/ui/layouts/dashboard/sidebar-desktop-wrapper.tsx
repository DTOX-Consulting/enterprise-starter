import { G } from '@mobily/ts-belt';

import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';

export function SidebarDesktopWrapper({
  children,
  className,
  sidebarWidth
}: PropsWithChildren & { className?: string; sidebarWidth?: number }) {
  return (
    <aside
      className={cn(
        'w-96 -translate-x-full overflow-hidden transition-transform duration-150 ease-in dark:border-r dark:border-gray-200 md:translate-x-0 md:shadow',
        G.isNotNullable(sidebarWidth) && `-ml-${sidebarWidth}`,
        className
      )}
    >
      <FadeIn className="h-full">{children}</FadeIn>
    </aside>
  );
}
