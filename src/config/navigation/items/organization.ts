'use client';

import { Briefcase, Settings } from 'lucide-react';

import type { NavigationItem } from '@/config/navigation/types';

export const organizationNavigationItems = (basePath: string): NavigationItem[] => [
  {
    name: 'Businesses',
    disabled: false,
    bottom: false,
    href: basePath,
    icon: Briefcase,
    isAccordion: false
  },
  {
    name: 'Settings',
    disabled: false,
    bottom: false,
    href: `${basePath}/settings`,
    icon: Settings,
    isAccordion: false
  }
];
