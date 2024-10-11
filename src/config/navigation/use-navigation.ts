import { usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

import { initialize, parsePath } from '@/config/navigation';
import { getCurrent, getCurrentParent, isInPages } from '@/config/navigation/pagination';
import { useForceState } from '@/lib/hooks/use-force-rerender';

import type { NavigationItem } from '@/config/navigation/types';

export function useNavigation() {
  const pathname = usePathname();

  const path = useMemo(() => parsePath(pathname), [pathname]);
  const items: NavigationItem[] = useMemo(() => initialize(pathname), [pathname]);

  const [currentActive, setCurrentActive] = useForceState<string | null>(
    getCurrent(items, pathname)?.name ?? null
  );

  const setActive = useCallback(
    (name?: string, rerender?: boolean) => {
      const set = (navItems: NavigationItem[]) => {
        navItems.forEach((item) => {
          if (item.name === name) {
            setCurrentActive(name, rerender);
          }
          if (item.items) {
            set(item.items);
          }
        });
      };

      set(items);
    },
    [items, setCurrentActive]
  );

  const getActive = useCallback(() => getCurrent(items, pathname), [items, pathname]);

  const removeActive = useCallback(() => setCurrentActive(null, true), [setCurrentActive]);

  const isActive = useCallback(
    (item: NavigationItem) => item.name === getActive()?.name,
    [getActive]
  );

  const getActiveParent = useCallback(() => getCurrentParent(items, pathname), [items, pathname]);

  const is = useCallback(
    (pathPart: keyof typeof path, str?: string) => path[pathPart] === str,
    [path]
  );

  const inPages = useCallback((pagePath: string) => isInPages(pagePath, initialize(pagePath)), []);

  return {
    is,
    path,
    items,
    inPages,
    isActive,
    setActive,
    getActive,
    removeActive,
    currentActive,
    getActiveParent
  };
}

export type NavigationProps = ReturnType<typeof useNavigation> & {
  isSubLink?: boolean;
};
