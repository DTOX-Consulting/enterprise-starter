import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter as nextUseRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Options = NavigateOptions & {
  removeSearchParams?: boolean;
};

export function useRouter() {
  const router = nextUseRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateRoute = useCallback(
    (method: 'push' | 'replace', path?: string, options: Options = {}) => {
      const { removeSearchParams, ...navigateOptions } = options;
      const noSearch = removeSearchParams || !searchParams.size;
      const search = noSearch ? '' : `?${searchParams}`;
      const route = path || pathname;
      const href = `${route}${search}`;

      router[method](href, navigateOptions);
    },
    [router, pathname, searchParams]
  );

  return {
    refresh: () => router.refresh(),
    push: (path?: string, options: Options = {}) => updateRoute('push', path, options),
    replace: (path?: string, options: Options = {}) => updateRoute('replace', path, options)
  };
}
