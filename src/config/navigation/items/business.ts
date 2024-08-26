'use client';

import {
  Bot,
  Building,
  Cog,
  Cpu,
  FilePieChart,
  Filter,
  LayoutTemplate,
  Lightbulb,
  MonitorPlay,
  Route,
  ScanEye,
  ScrollText,
  Search,
  SearchCode,
  UserRoundSearch,
  Wallpaper,
  Waypoints
} from 'lucide-react';

import type { NavigationItem } from '@/config/navigation/types';

export const businessNavigationItems = (basePath: string): NavigationItem[] => [
  {
    name: 'Idea Refinement',
    disabled: true,
    bottom: false,
    href: basePath,
    icon: Lightbulb,
    isAccordion: true,
    items: [
      {
        name: 'Core',
        disabled: false,
        bottom: false,
        icon: Cpu,
        href: `${basePath}/core`
      },
      {
        name: 'Branding',
        disabled: false,
        bottom: false,
        icon: ScanEye,
        href: `${basePath}/branding`
      }
    ]
  },
  {
    name: 'Research',
    disabled: true,
    bottom: false,
    href: basePath,
    icon: SearchCode,
    isAccordion: true,
    items: [
      {
        name: 'User Persona Analysis',
        disabled: false,
        bottom: false,
        icon: UserRoundSearch,
        href: `${basePath}/user-persona-analysis`
      },
      {
        name: 'Competitive Analysis',
        disabled: false,
        bottom: false,
        icon: FilePieChart,
        href: `${basePath}/competitive-analysis`
      },
      {
        name: 'Funnel Analysis',
        disabled: false,
        bottom: false,
        icon: Filter,
        href: `${basePath}/funnel-analysis`
      }
    ]
  },
  {
    name: 'Business Planning',
    disabled: true,
    bottom: false,
    href: basePath,
    icon: Route,
    isAccordion: true,
    items: [
      {
        name: 'Pitch Deck',
        disabled: false,
        bottom: false,
        icon: Wallpaper,
        href: `${basePath}/pitch-deck`
      },
      {
        name: 'Lean Canvas',
        disabled: false,
        bottom: false,
        icon: ScrollText,
        href: `${basePath}/lean-canvas`
      },
      {
        name: 'Business Model',
        disabled: false,
        bottom: false,
        icon: Building,
        href: `${basePath}/business-model`
      }
    ]
  },
  {
    name: 'Go To Market',
    disabled: true,
    bottom: false,
    href: basePath,
    icon: MonitorPlay,
    isAccordion: true,
    items: [
      {
        name: 'Strategy',
        disabled: false,
        bottom: false,
        icon: Waypoints,
        href: `${basePath}/gtm-strategy`
      },
      {
        name: 'Landing Page',
        disabled: false,
        bottom: false,
        icon: LayoutTemplate,
        href: `${basePath}/landing-page`
      },
      {
        name: 'Prototyping',
        disabled: false,
        bottom: false,
        icon: Bot,
        href: `${basePath}/prototyping`
      }
    ]
  },
  {
    name: 'Find a Co-Founder',
    disabled: false,
    bottom: false,
    href: `${basePath}/find-co-founder`,
    icon: Search,
    isAccordion: false
  },
  {
    name: 'Business Settings',
    disabled: false,
    bottom: true,
    href: `${basePath}/settings`,
    icon: Cog,
    isAccordion: false
  }
];
