import { useState, useMemo, useCallback } from 'react';

import { navigation } from '@/config/navigation';

import type { NavigationItem } from 'types';

export type NavigationProps = {
  isActive: (item: NavigationItem) => boolean;
  setActive: (name?: string) => void;
  currentActive: string | null;
  items: NavigationItem[];
  isSublink?: boolean;
};

export function useNavigation() {
  const initialActive =
    {
      team: 'Team',
      learn: 'Learn',
      account: 'Account',
      settings: 'Settings'
    }[global.location?.pathname?.split('/').shift() ?? ''] ?? 'Businesses';

  const [currentActive, setCurrentActive] = useState<string | null>(initialActive);

  const items: NavigationItem[] = useMemo(() => navigation, []);

  const setActive = useCallback(
    (name?: string) => {
      const set = (items: NavigationItem[]) => {
        items.forEach((item) => {
          item.name === name && setCurrentActive(name);
          item.items && set(item.items);
        });
      };

      set(items);
    },
    [items]
  );

  const isActive = useCallback(
    (item: NavigationItem) => item.name === currentActive,
    [currentActive]
  );

  return { items, isActive, setActive, currentActive };
}
