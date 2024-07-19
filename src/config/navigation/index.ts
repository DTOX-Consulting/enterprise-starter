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

type Base = (typeof bases)[number];

type Path = {
  base: Base;
  page?: string;
  orgId?: string;
  businessId?: string;
};

const businessBases = ['businesses'] as const;
const nonBusinessBases = [
  'chat',
  'pricing',
  'settings',
  'profile',
  'external',
  'dashboard',
  'document',
  'feature-previews'
] as const;

const bases = ['', ...businessBases, ...nonBusinessBases] as const;
const pages = ['new', 'edit', 'view', 'profile', 'settings'] as const;

function isPage(value?: string) {
  return !value || pages.includes(value);
}

export function isNonBusinessBase(base: string): base is Base {
  return nonBusinessBases.includes(base as Base);
}

export function initialize(path: string) {
  const { base, orgId, businessId } = parsePath(path);

  if (base === 'businesses' && orgId && businessId) {
    return config.business(`/${base}/${orgId}/${businessId}`);
  }

  if (base === 'businesses' && orgId) {
    return config.organization(`/${base}/${orgId}`);
  }

  if (base === '' || isNonBusinessBase(base)) {
    return config.root('/businesses');
  }

  return config.none();
}

export function createPath({ page, base, orgId, businessId }: Path) {
  const path = [base, orgId, businessId, page].filter(Boolean).join('/');
  return `/${path}`;
}

export function parsePath(path: string): Path {
  let [, base = '', orgId, businessId, page] = path.split('/');

  if (isPage(businessId)) {
    page = businessId;
    businessId = undefined;
  }

  if (isPage(orgId)) {
    page = orgId;
    orgId = undefined;
  }

  return { base, orgId, businessId, page } as Path;
}
