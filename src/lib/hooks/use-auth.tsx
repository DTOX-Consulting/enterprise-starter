import { useCallback, useEffect } from 'react';

import { useNavigatorOnline } from '@/lib/hooks/use-navigator-online';
import { defaultUserSession } from '@/lib/sdks/kinde/api/constant';
import { api } from '@/trpc/react';

export function useAuth() {
  const utils = api.useUtils();
  const { isOnline, isReconnected } = useNavigatorOnline();

  const enabled = false; // isOnline;

  useEffect(() => {
    if (isReconnected) {
      void utils.auth.user.invalidate();
    }
  }, [isReconnected, utils.auth.user]);

  let { data } = api.auth.user.useQuery(undefined, {
    placeholderData: defaultUserSession(),
    staleTime: 1000 * 60 * 60,
    suspense: true,
    enabled
  });

  if (!isOnline) {
    data = utils.auth.user.getData();
  }

  const userId = data?.user.id ?? 'default';
  const orgId = data?.organization?.orgCode ?? 'default';

  const getStorageKey = useCallback(
    (prefix: string) => `${prefix}-${orgId}-${userId}`,
    [orgId, userId]
  );

  return {
    orgId,
    userId,
    ...data,
    enabled,
    session: data,
    getStorageKey
  };
}
