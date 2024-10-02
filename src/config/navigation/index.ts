import { businessNavigationItems } from '@/config/navigation/items/business';
import { organizationNavigationItems } from '@/config/navigation/items/organization';
import { rootNavigationItems } from '@/config/navigation/items/root';

import type { NavigationItem } from '@/config/navigation/types';

const config = {
  none: () => [] as NavigationItem[],
  root: rootNavigationItems,
  business: businessNavigationItems,
  organization: organizationNavigationItems
} as const;

type Base = typeof businessBases[number] | typeof nonBusinessBases[number];

type SlugBase = (typeof slugBases)[number];

type Path = {
  base: Base;
  slug?: string;
  page?: string;
  orgId?: string;
  businessId?: string;
};

const slugBases = ['p'] as const;
const businessBases = ['businesses', 'p'] as const;
const nonBusinessBases = [
  '',
  'chat',
  'guide',
  'pricing',
  'settings',
  'profile',
  'external',
  'dashboard',
  'document',
  'notifications',
  'feature-previews'
] as const;

const bases = [...businessBases, ...nonBusinessBases] as const;
const pages = ['new', 'edit', 'view', 'profile', 'settings'] as const;

function isPage(value: string | undefined): boolean {
  return !value || pages.includes(value as typeof pages[number]);
}

export function isNonBusinessBase(base: string): base is Base {
  return nonBusinessBases.includes(base as Base);
}

export function isBusinessBase(base: string): base is Base {
  return businessBases.includes(base as Base);
}

export function isSlugBase(base: string): base is SlugBase {
  return slugBases.includes(base as SlugBase);
}

export function initialize(path: string) {
  const { base, slug, orgId, businessId } = parsePath(path);

  if (isBusinessBase(base) && orgId && businessId) {
    return config.business(`/${base}/${orgId}/${businessId}`);
  }

  if (isBusinessBase(base) && orgId) {
    return config.organization(`/${base}/${orgId}`);
  }

  if (isBusinessBase(base) && slug) {
    return config.business(`/${base}/${slug}`);
  }

  if (isNonBusinessBase(base)) {
    return config.root('/businesses');
  }

  return config.none();
}

export function createPath({ page, slug, base, orgId, businessId }: Path) {
  if (slug) {
    base = slugBases[0];
    orgId = undefined;
    businessId = undefined;
  }

  const path = [base, slug, orgId, businessId, page].filter(Boolean).join('/');
  return `/${path}`;
}

export function parsePath(path: string): Path {
  let [, base = '', orgId, businessId, page] = path.split('/');
  let slug: string | undefined;

  if (isSlugBase(base)) {
    slug = orgId;
    page = businessId;
    orgId = undefined;
    businessId = undefined;
  }

  if (!isSlugBase(base) && isPage(businessId)) {
    page = businessId;
    businessId = undefined;
  }

  if (!isSlugBase(base) && isPage(orgId)) {
    page = orgId;
    orgId = undefined;
  }

  if (isNonBusinessBase(base)) {
    orgId = undefined;
    businessId = undefined;
    page = undefined;
  }

  return { base, slug, orgId, businessId, page } as Path;
}
