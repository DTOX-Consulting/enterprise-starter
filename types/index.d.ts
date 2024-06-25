import type { Routes } from '@/config/navigation';
import type { User } from '@prisma/client';
import type { LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export type FeatureFlag<T = unknown> = {
  value: T;
  name: string;
  enabled: boolean;
};

export interface NavigationItem {
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
}

export interface HomeItem extends NavigationItem {
  src: StaticImageData;
}

type ValueOf<T> = T[keyof T];
