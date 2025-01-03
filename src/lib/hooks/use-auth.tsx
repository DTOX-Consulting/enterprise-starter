'use client';

import { useCallback, useEffect } from 'react';

import { useNavigatorOnline } from '@/lib/hooks/use-navigator-online';
import { defaultUserSession } from '@/lib/sdks/kinde/api/constant';
import { api } from '@/trpc/react';

export function useAuth() {
  const utils = api.useUtils();
  const { isOnline, isReconnected } = useNavigatorOnline();

  useEffect(() => {
    if (isReconnected) {
      void utils.auth.user.invalidate();
    }
  }, [isReconnected, utils.auth.user]);

  let { data, error, isFetching } = api.auth.user.useQuery(
    { swallowError: true },
    {
      placeholderData: defaultUserSession(),
      staleTime: 1000 * 60 * 60,
      enabled: isOnline,
      suspense: false,
      retry: 0,
      onError: (err) => {
        console.error('Auth query failed:', err);
      }
    }
  );

  if (!isOnline || !data || !!error) {
    data = utils.auth.user.getData() ?? defaultUserSession();
  }

  const userId = data.user.id || 'default';
  const orgId = data.organization?.orgCode ?? 'default';

  const getStorageKey = useCallback(
    (prefix: string) => `${prefix}-${orgId}-${userId}`,
    [orgId, userId]
  );

  return {
    orgId,
    userId,
    ...data,
    session: data,
    getStorageKey,
    isLoading: isFetching
  };
}
