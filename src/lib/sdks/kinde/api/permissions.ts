import { permissionsApi, organizationsApi } from '@/lib/sdks/kinde/api/client';
import { getDefaultOrgCode, getUserByEmail } from '@/lib/sdks/kinde/api/utils';

export const findPermission = async (permission: string) => {
  const { permissions } = await permissionsApi.getPermissions();
  const foundPermission = permissions?.find((p) => p.key === permission);
  if (!foundPermission) throw new Error('Permission not found');
  return foundPermission as NonNullable<typeof foundPermission> & { id: string };
};

export const createPermission = async (key: string, name: string, description?: string) =>
  permissionsApi.createPermission({
    requestBody: {
      key,
      name,
      description
    }
  });

export const getPermissions = async (email: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();

  const { permissions } = await organizationsApi.getOrganizationUserPermissions({
    userId: user.id,
    orgCode
  });

  return { user, permissions, orgCode };
};

export const addPermission = async (email: string, permission: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();
  const permissionId = (await findPermission(permission)).id;

  await organizationsApi.createOrganizationUserPermission({
    orgCode,
    userId: user.id,
    requestBody: {
      permission_id: permissionId
    }
  });
};

export const removePermission = async (email: string, permission: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();
  const permissionId = (await findPermission(permission)).id;

  if (!permissionId) throw new Error('Permission not found');

  await organizationsApi.deleteOrganizationUserPermission({
    orgCode,
    permissionId,
    userId: user.id
  });
};

export const removeAllPermissions = async (email: string, orgId?: string) => {
  const { permissions, user, orgCode } = await getPermissions(email, orgId);
  if (!permissions) return;

  await Promise.all(
    permissions.map(async (permission) => {
      if (!permission.id) return;
      return organizationsApi.deleteOrganizationUserPermission({
        permissionId: permission.id,
        userId: user.id,
        orgCode
      });
    })
  );
};

export const setPermission = async (email: string, permission: string, orgId?: string) => {
  await removeAllPermissions(email, orgId);
  await addPermission(email, permission, orgId);
};
