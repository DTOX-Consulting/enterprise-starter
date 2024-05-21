import { LogIn, LogOut, Settings } from 'lucide-react';

import logo from '@/assets/images/logo.png';

import type { Route } from 'next';
import type { HomeItem, NavigationItem } from 'types';

const _routes = {
  // Default routes
  home: '/',
  login: '/login',
  logout: '/logout',
  comingSoon: '/coming-soon',
  account: '/settings/account',
  settings: '/settings/account'

  // Your routes here
} as const;

export const routes: Routes = _routes;

export type Routes = Record<keyof typeof _routes, Route<string>>;

export const isUnauthenticatedRoute = () => {
  const route = global.location?.pathname;
  return [routes.login, routes.home].includes(route);
};

export const home: HomeItem = { name: 'Home', href: routes.home, src: logo };

export const navigation: NavigationItem[] = [
  { name: 'Settings', href: routes.settings, bottom: true },
  { name: 'Login', href: routes.login, unauthenticated: true, bottom: true },
  { name: 'Logout', href: routes.logout, authenticated: true, bottom: true }
];

export const footerNavigation: NavigationItem[] = [{ name: 'Home', href: routes.home }];
