import { businessNavigationItems } from '@/config/navigation/items/business';
import { organizationNavigationItems } from '@/config/navigation/items/organization';

import type { NavigationItem } from '@/config/navigation/types';

const config = {
  business: businessNavigationItems,
  organization: organizationNavigationItems,
  none: () => [] as NavigationItem[]
} as const;

type Path = {
  base: Base;
  page?: string;
  orgId?: string;
  businessId?: string;
};

type Base = (typeof bases)[number];
const bases = ['', 'businesses', 'pricing', 'settings', 'dashboard'] as const;

export function initialize(path: string) {
  const { base, orgId, businessId } = parsePath(path);

  if (base === 'businesses' && orgId && businessId) {
    return config.business(`/${base}/${orgId}/${businessId}`);
  }

  if (base === 'businesses' && orgId) {
    return config.organization(`/${base}/${orgId}`);
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

function isPage(value?: string) {
  return !value || ['new', 'edit', 'view', 'settings'].includes(value);
}
