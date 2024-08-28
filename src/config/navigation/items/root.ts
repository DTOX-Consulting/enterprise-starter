'use client';

import { Briefcase } from 'lucide-react';

import type { NavigationItem } from '@/config/navigation/types';

export const rootNavigationItems = (basePath: string): NavigationItem[] => [
  {
    name: 'Businesses',
    disabled: false,
    bottom: false,
    href: basePath,
    icon: Briefcase,
    isAccordion: false
  }
];
