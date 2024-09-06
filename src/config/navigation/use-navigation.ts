import { usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

import { initialize, isNonBusinessBase, isSlugBase, parsePath } from '@/config/navigation';
import { getCurrent, getCurrentParent, isInPages } from '@/config/navigation/pagination';
import { useDBDataExtras, useDBDataExtrasMutation } from '@/data';
import { useDebounceCallback, useDebounceEffect } from '@/lib/hooks/use-debounce';
import { useForceState } from '@/lib/hooks/use-force-rerender';
import { isDeepEqual } from '@/lib/utils/deep-equal';

import type { NavigationItem } from '@/config/navigation/types';
import type { UserMeta } from '@/lib/db/rxdb/schemas/user-meta';

export function useLastPage() {
  const id = 'last-page';
  const { userMeta } = useDBDataExtras();
  const { upsertUserMeta } = useDBDataExtrasMutation();

  const getLastPage = useDebounceCallback<
    (arg: NonNullable<UserMeta['lastVisited']>) => void | Promise<void>
  >(
    `get-${id}-callback`,
    async (fn) => {
      const items = userMeta?.lastVisited ?? {};
      await fn(items);
    },
    [userMeta]
  );

  const setLastPage = useDebounceCallback<NonNullable<UserMeta['lastVisited']>>(
    `set-${id}-callback`,
    (lastVisitedData) => {
      if (!userMeta || isDeepEqual(lastVisitedData, userMeta.lastVisited)) return;

      void upsertUserMeta({
        id: userMeta.id,
        lastVisited: lastVisitedData,
        editingState: userMeta.editingState,
        journeyState: userMeta.journeyState ?? {},
        hasAcceptedTerms: userMeta.hasAcceptedTerms ?? false
      });
    },
    [userMeta, upsertUserMeta],
    1000
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
      if (isNonBusinessBase(base) || isSlugBase(base)) return;
      void setLastPage({ businessId, organizationId: orgId });
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

  const inPages = useCallback((path: string) => isInPages(path, initialize(path)), []);

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
