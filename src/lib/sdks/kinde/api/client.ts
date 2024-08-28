// eslint-disable-next-line import/no-unassigned-import
import '@/lib/sdks/kinde/auth';

// eslint-disable-next-line import/order
import { Users, Roles, Permissions, Organizations } from '@kinde/management-api-js';

export const usersApi = Users;
export const rolesApi = Roles;
export const permissionsApi = Permissions;
export const organizationsApi = Organizations;
