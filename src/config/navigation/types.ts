import type { Routes } from '@/config/navigation/routes';
import type { TierName } from '@/config/permissions/features';
import type { LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import type { ValueOf } from 'tsdef';

export type NavigationItem = {
  tier?: TierName;
  name: string;
  icon?: LucideIcon;
  active?: boolean;
  bottom?: boolean;
  external?: boolean;
  disabled?: boolean;
  href: ValueOf<Routes>;
  isAccordion?: boolean;
  authenticated?: boolean;
  unauthenticated?: boolean;
  items?: NavigationItem[];
};

export type HomeItem = {
  src: StaticImageData;
} & NavigationItem;

export type GetNavigationItems = (route: string) => NavigationItem[];
