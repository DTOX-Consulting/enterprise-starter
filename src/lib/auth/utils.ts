import { G } from '@mobily/ts-belt';
import { headers } from 'next/headers';
import { redirect as nextRedirect, RedirectType } from 'next/navigation';

import { getEnv } from '@/lib/env/env.mjs';

export function generateRoutes(
  path: string | null = null,
  paramsToAdd: Record<string, string> = {}
) {
  const headerList = headers();
  const currentPath = headerList.get('x-current-path');
  const redirectPath = headerList.get('x-redirect-path');

  const appUrl = getEnv('NEXT_PUBLIC_APP_URL');
  const url = new URL(path ?? '', appUrl);
  const currentUrl = new URL(currentPath ?? '', appUrl);
  const redirectUrl = new URL(redirectPath ?? '', appUrl);

  Object.entries(paramsToAdd).forEach(([key, value]) => {
    url.searchParams.set(key, value);
    currentUrl.searchParams.set(key, value);
    redirectUrl.searchParams.set(key, value);
  });

  const paths = {
    current: {
      path: currentPath,
      url: currentUrl.toString(),
      params: Object.fromEntries(currentUrl.searchParams.entries())
    },
    redirect: {
      path: redirectPath,
      url: redirectUrl.toString(),
      params: Object.fromEntries(redirectUrl.searchParams.entries())
    },
    generated: {
      url: url.toString(),
      path: url.pathname,
      params: Object.fromEntries(url.searchParams.entries())
    }
  };

  if (G.isNotNullable(path) && G.isNotNullable(redirectPath)) {
    url.searchParams.set('next', redirectPath);
    paths.generated.url = url.toString();
  }

  return paths;
}

export function redirect({
  pathOrUrl,
  isExternal = false,
  redirectType = RedirectType.replace
}: {
  pathOrUrl: string;
  isExternal?: boolean;
  redirectType?: RedirectType;
}) {
  const appUrl = getEnv('NEXT_PUBLIC_APP_URL');

  if (!isExternal && !pathOrUrl.startsWith(appUrl)) {
    pathOrUrl = generateRoutes(pathOrUrl).generated.url;
  }

  return nextRedirect(pathOrUrl, redirectType);
}
