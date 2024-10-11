'use client';

import { Briefcase, CreditCard, User, Zap } from 'lucide-react';

import type { NavigationItem } from '@/config/navigation/types';

export const rootNavigationItems = (basePath: string): NavigationItem[] => [
  {
    name: 'Dashboard',
    disabled: false,
    bottom: false,
    href: basePath,
    icon: Briefcase,
    isAccordion: false
  },
  {
    name: 'Profile',
    disabled: false,
    bottom: false,
    href: `${basePath}/profile`,
    icon: User,
    isAccordion: false
  },
  {
    name: 'Pricing',
    disabled: false,
    bottom: false,
    href: `${basePath}/pricing`,
    icon: CreditCard,
    isAccordion: false
  },
  {
    name: 'Feature Previews',
    disabled: false,
    bottom: false,
    href: `${basePath}/feature-previews`,
    icon: Zap,
    isAccordion: false
  }
];
