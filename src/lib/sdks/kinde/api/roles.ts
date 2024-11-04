import { G } from '@mobily/ts-belt';

import { rolesApi, organizationsApi } from '@/lib/sdks/kinde/api/client';
import { getDefaultOrgCode, getUserByEmail } from '@/lib/sdks/kinde/api/utils';

export const findRole = async (role: string) => {
  const { roles } = await rolesApi.getRoles();
  const foundRole = roles?.find((rol) => rol.key === role);
  if (!foundRole) throw new Error('Role not found');
  return foundRole as NonNullable<typeof foundRole> & { id: string };
};

export const createRole = async (key: string, name: string, description?: string) =>
  rolesApi.createRole({
    requestBody: {
      key,
      name,
      description
    }
  });

export const getRoles = async (email: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();

  const { roles } = await organizationsApi.getOrganizationUserRoles({
    userId: user.id,
    orgCode
  });

  return { user, roles, orgCode };
};

export const addRole = async (email: string, role: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();
  const roleId = (await findRole(role)).id;

  await organizationsApi.createOrganizationUserRole({
    orgCode,
    userId: user.id,
    requestBody: {
      role_id: roleId
    }
  });
};

export const removeRole = async (email: string, role: string, orgId?: string) => {
  const user = await getUserByEmail(email);
  const orgCode = orgId ?? getDefaultOrgCode();
  const roleId = (await findRole(role)).id;

  await organizationsApi.deleteOrganizationUserRole({
    roleId,
    orgCode,
    userId: user.id
  });
};

export const removeAllRoles = async (email: string, orgId?: string) => {
  const { roles, user, orgCode } = await getRoles(email, orgId);
  if (!roles) return;

  await Promise.all(
    roles.map(async (role) => {
      if (G.isNullable(role.id)) return;
      return organizationsApi.deleteOrganizationUserRole({
        userId: user.id,
        roleId: role.id,
        orgCode
      });
    })
  );
};

export const setRole = async (email: string, role: string, orgId?: string) => {
  await removeAllRoles(email, orgId);
  await addRole(email, role, orgId);
};
