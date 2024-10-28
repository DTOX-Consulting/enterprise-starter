'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { Separator } from '@/components/ui/atoms/separator';
import { useNavigation } from '@/config/navigation/use-navigation';
import { useForceState } from '@/lib/hooks/use-force-rerender';

import type { NavigationItem } from '@/config/navigation/types';

export const standardizePath = (path: string) => {
  let start = 0;
  let end = path.length;

  while (start < end && path[start] === '/') {
    start++;
  }
  while (end > start && path[end - 1] === '/') {
    end--;
  }

  return path.slice(start, end);
};

export const isInPages = (path: string, navigationItems: NavigationItem[]) => {
  const pages = getPages(navigationItems);
  return pages.some((page) => standardizePath(page.href) === standardizePath(path));
};

export const getPages = (navigationItems: NavigationItem[]) =>
  navigationItems.reduce((acc, item) => {
    if (item.disabled === false) {
      acc.push(item);
    }

    if (item.isAccordion === true && item.items && Array.isArray(item.items)) {
      item.items.forEach((subItem) => {
        if (subItem.disabled === false) {
          acc.push(subItem);
        }
      });
      return acc;
    }

    return acc;
  }, [] as NavigationItem[]);

export function getPrevious(navigationItems: NavigationItem[], path: string) {
  const pages = getPages(navigationItems);
  const currentIndex = pages.findIndex((page) => page.href === path);
  const previousIndex = currentIndex - 1;

  if (previousIndex < 0) {
    return null;
  }

  return pages[previousIndex] ?? pages[0];
}

export function getNext(navigationItems: NavigationItem[], path: string) {
  const pages = getPages(navigationItems);
  const currentIndex = pages.findIndex((page) => page.href === path);
  const nextIndex = currentIndex + 1;

  if (nextIndex >= pages.length) {
    return null;
  }

  return pages[nextIndex] ?? pages[0];
}

export function getCurrent(navigationItems: NavigationItem[], path: string) {
  const pages = getPages(navigationItems);
  return pages.find((page) => standardizePath(page.href) === standardizePath(path)) ?? pages[0];
}

export function getParent(navigationItems: NavigationItem[], path: string) {
  let currentParent: NavigationItem | undefined;

  navigationItems.forEach((item) => {
    if (item.isAccordion === true && item.items && Array.isArray(item.items)) {
      item.items.forEach((subItem) => {
        if (standardizePath(subItem.href) === standardizePath(path)) {
          currentParent = item;
        }
      });
    }
  });

  return currentParent;
}

export function getCurrentParent(navigationItems: NavigationItem[], path: string) {
  const current = getCurrent(navigationItems, path);
  return current ? getParent(navigationItems, current.href) : undefined;
}

export function NavigationPagination() {
  const path = usePathname();
  const { items } = useNavigation();

  const [nextRoute, setNextRoute] = useForceState(getNext(items, path));
  const [previousRoute, setPreviousRoute] = useForceState(getPrevious(items, path));

  useEffect(() => {
    setNextRoute(getNext(items, path), true);
    setPreviousRoute(getPrevious(items, path), true);
  }, [path, items, setNextRoute, setPreviousRoute]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Separator />
      <div className="!mt-6 flex w-full flex-row justify-between pb-8">
        {previousRoute && (
          <div className="flex grow items-start justify-start">
            <Button asChild>
              <Link href={previousRoute.href}>
                <ChevronLeft className="-ml-2 mr-2" />
                <span>{previousRoute.name}</span>
              </Link>
            </Button>
          </div>
        )}
        {nextRoute && (
          <div className="flex grow items-end justify-end">
            <Button asChild>
              <Link href={nextRoute.href}>
                <span>{nextRoute.name}</span>
                <ChevronRight className="-mr-2 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
