import { G } from '@mobily/ts-belt';
import { TRPCError } from '@trpc/server';
import { match } from 'ts-pattern';

import { hash } from '@/lib/utils/string';

import type { AvailablePermissions } from '@/lib/auth/permissions';
import type { SessionWithNonNullableUser } from '@/trpc/types';

export type AuthorizeOptions<T = unknown> = {
  data: T;
  action: string;
  session: SessionWithNonNullableUser;
  requiredPermissions?: AvailablePermissions[];
};

/**
 * Generic authorization function that can be used for any type of access control
 *
 * @throws {TRPCError} If user is not authenticated or lacks required permissions
 */
export const authorize = <T>({
  data,
  action,
  session,
  requiredPermissions = []
}: AuthorizeOptions<T>) => {
  if (G.isNullable(session.user)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User must be authenticated'
    });
  }

  // Check basic permissions
  const hasPermission = checkPermissions({
    session,
    requiredPermissions
  });

  if (!hasPermission) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `User does not have required permissions for: ${action}`
    });
  }

  // Check resource-specific access
  const hasAccess = checkResourceAccess({
    session,
    action,
    data
  });

  if (!hasAccess) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `User does not have access to perform ${action}`
    });
  }

  return true;
};

const checkPermissions = ({
  session,
  requiredPermissions
}: {
  session: SessionWithNonNullableUser;
  requiredPermissions: string[];
}) => requiredPermissions.every((permission) => session.permissions.includes(permission));

type StorageAction = {
  key: string;
};

type CacheAction = {
  key: string;
};

const checkResourceAccess = <T>({
  data,
  action,
  session
}: {
  data: T;
  action: string;
  session: SessionWithNonNullableUser;
}) =>
  match(action)
    .with('storage.upload', 'storage.retrieve', () =>
      checkStorageAccess({ session, data: data as StorageAction })
    )
    .with('cache.set', 'cache.get', () => checkCacheAccess({ session, data: data as CacheAction }))
    .otherwise(() => false);

const checkStorageAccess = ({
  session,
  data
}: {
  data: StorageAction;
  session: SessionWithNonNullableUser;
}) => {
  const userHashPrefix = `${hash(session.user.id)}`;
  return data.key.startsWith(userHashPrefix);
};

const checkCacheAccess = ({
  session,
  data
}: {
  data: CacheAction;
  session: SessionWithNonNullableUser;
}) => data.key.includes(session.user.id);
