import { G } from '@mobily/ts-belt';

import { FadeIn } from '@/components/animations/fade-in';
import { useAtom } from '@/lib/state/atoms';
import { cn } from '@/lib/utils';

import type { PropsWithChildren } from 'react';

export function SidebarDesktopWrapper({
  children,
  className,
  sidebarWidth
}: PropsWithChildren & { className?: string; sidebarWidth?: number }) {
  const [isMinimized] = useAtom('sidebarMinimizedAtom');

  return (
    <aside
      className={cn(
        'w-96 -translate-x-full overflow-visible transition-all duration-150 ease-in dark:border-r dark:border-gray-200 md:translate-x-0 md:shadow',
        G.isNotNullable(sidebarWidth) && `-ml-${sidebarWidth}`,
        className,
        {
          'md:w-20': isMinimized
        }
      )}
    >
      <FadeIn className="flex h-full flex-col">{children}</FadeIn>
    </aside>
  );
}
