import { usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

import { initialize, isNonBusinessBase, parsePath } from '@/config/navigation';
import { getCurrent, getCurrentParent, isInPages } from '@/config/navigation/pagination';
import { useLocalData } from '@/lib/hooks/use-data';
import { useDebounceCallback, useDebounceEffect } from '@/lib/hooks/use-debounce';
import { useForceState } from '@/lib/hooks/use-force-rerender';

import type { NavigationItem } from '@/config/navigation/types';

type LastPageData = {
  id: string;
  orgId?: string;
  businessId?: string;
};

export function useLastPage() {
  const id = 'last-page';
  const { getLocalItems, setLocalItems } = useLocalData<LastPageData>(id);

  const getLastPage = useDebounceCallback<(arg: LastPageData) => void | Promise<void>>(
    `get-${id}-callback`,
    async (fn) => {
      const items = await getLocalItems();
      await fn(items?.[0] ?? { id });
    },
    [getLocalItems]
  );

  const setLastPage = useDebounceCallback<Omit<LastPageData, 'id'>>(
    `set-${id}-callback`,
    (data) => void setLocalItems([{ id, ...data }]),
    [setLocalItems],
    2000
  );

  return {
    getLastPage,
    setLastPage
  };
}

export function useNavigation() {
  const pathname = usePathname();

  const path = useMemo(() => parsePath(pathname), [pathname]);
  const items: NavigationItem[] = useMemo(() => initialize(pathname), [pathname]);

  const [currentActive, setCurrentActive] = useForceState<string | null>(
    getCurrent(items, pathname)?.name ?? null
  );

  const setActive = useCallback(
    (name?: string, rerender?: boolean) => {
      const set = (items: NavigationItem[]) => {
        items.forEach((item) => {
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

  const { setLastPage } = useLastPage();

  useDebounceEffect(
    'set-last-page-effect',
    () => {
      const { base, orgId, businessId } = path;
      if (isNonBusinessBase(base)) return;

      void setLastPage({ orgId, businessId });
    },
    [path, setLastPage]
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

  const inPages = useCallback((path: string) => {
    return isInPages(path, initialize(path));
  }, []);

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
