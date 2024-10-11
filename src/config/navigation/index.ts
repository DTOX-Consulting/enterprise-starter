import { rootNavigationItems } from '@/config/navigation/items/root';

import type { NavigationItem } from '@/config/navigation/types';

const config = {
  none: () => [] as NavigationItem[],
  root: rootNavigationItems
} as const;

type Base = 'dashboard' | 'settings' | 'profile' | 'pricing' | 'feature-previews';

type Path = {
  base: Base;
  slug?: string;
  page?: string;
};

const bases = ['dashboard', 'settings', 'profile', 'pricing', 'feature-previews'] as const;
const pages = ['new', 'edit', 'view', 'profile', 'settings'] as const;

function isPage(value: string | undefined): boolean {
  return value === undefined || pages.includes(value as (typeof pages)[number]);
}

export function isRootBase(base: string): base is Base {
  return bases.includes(base as Base);
}

export function initialize(path: string) {
  const { base, page } = parsePath(path);

  if (isRootBase(base) && isPage(page)) {
    return config.root('/');
  }

  return config.none();
}

export function createPath({ base, page }: Path) {
  const path = [base, page].filter(Boolean).join('/');
  return `/${path}`;
}

export function parsePath(path: string): Path {
  const [, base, page] = path.split('/');

  return { base, page } as Path;
}
