import { LogIn, LogOut, Settings } from 'lucide-react';

import logo from '@/assets/images/logo.png';

import type { Route } from 'next';
import type { HomeItem, NavigationItem } from 'types';

const _routes = {
  // Default routes
  home: '/',
  docs: '/docs',
  dashboard: '/',
  login: '/login',
  logout: '/logout',
  comingSoon: '/coming-soon',
  settings: '/settings/account',
  account: '/settings/account',

  // Your routes here
  intro: '/intro',
  contact: '/contact',
  chat: '/chat'
} as const;

export const routes: Routes = _routes;

export type Routes = Record<keyof typeof _routes, Route<string>>;

export const isUnauthenticatedRoute = () => {
  const route = global.location?.pathname;
  return [routes.login, routes.home].includes(route);
};

export const home: HomeItem = { name: 'Home', href: routes.home, src: logo };

export const navigation: NavigationItem[] = [
  { name: 'Docs', href: routes.docs, bottom: false },
  { name: 'Intro', href: routes.intro, bottom: false },
  { name: 'AI Chat', href: routes.chat, bottom: false },
  { name: 'Contact', href: routes.contact, bottom: false },
  // { name: 'Login', href: routes.login, unauthenticated: true, bottom: false },
  // { name: 'Logout', href: routes.logout, authenticated: true, bottom: false },
  { name: 'Coming Soon', href: routes.comingSoon, bottom: false }
];

export const footerNavigation: NavigationItem[] = [{ name: 'Home', href: routes.home }];
