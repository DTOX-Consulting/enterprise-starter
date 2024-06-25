import { useCallback } from 'react';

import { api } from '@/trpc/react';

import type {
  KindeUser,
  KindePermissions,
  KindeOrganization
} from '@kinde-oss/kinde-auth-nextjs/types';

type UserResponse = {
  authenticated: boolean;
  user: KindeUser | null;
  permissions: KindePermissions | null;
  organization: KindeOrganization | null;
};

const defaultUserResponse: UserResponse = {
  user: null,
  permissions: null,
  organization: null,
  authenticated: false
};

export function useUser() {
  const { data } = api.user.useQuery(undefined, {
    placeholderData: defaultUserResponse,
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
    userId,
    ...data,
    getStorageKey
  };
}
