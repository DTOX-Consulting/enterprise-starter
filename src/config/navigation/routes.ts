import logo from '@/assets/images/logo.png';

import type { HomeItem, NavigationItem } from '@/config/navigation/types';
import type { Route } from 'next';

export type APIRoutes = typeof apiRoutes;
export type Routes = Record<keyof typeof routes, Route<keyof typeof routes>>;

export const routes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  pricing: '/pricing',
  profile: '/profile',
  settings: '/profile',
  dashboard: '/dashboard',
  // settings: '/settings',
  comingSoon: '/coming-soon',
  authCallback: '/auth-callback'

  // Your routes here
} as const;

export const apiRoutes = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register'
  }
} as const;

export const home: HomeItem = { name: 'Home', href: routes.home, src: logo };

export const navigation: NavigationItem[] = [];

export const footerNavigation: NavigationItem[] = [{ name: 'Home', href: routes.home }];
