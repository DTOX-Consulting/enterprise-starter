import { useCallback } from 'react';

import { defaultUserSession } from '@/lib/sdks/kinde/api/constant';
import { api } from '@/trpc/react';

export function useAuth() {
  const { data } = api.auth.user.useQuery(undefined, {
    placeholderData: defaultUserSession(),
    staleTime: 1000 * 60 * 10,
    suspense: true
  });

  const userId = data?.user?.id ?? 'default';
  const orgId = data?.organization?.orgCode ?? 'default';

  const getStorageKey = useCallback(
    (prefix: string) => {
      return `${prefix}-${orgId}-${userId}`;
    },
    [orgId, userId]
  );

  return {
    orgId,
    userId,
    ...data,
    getStorageKey
  };
}
