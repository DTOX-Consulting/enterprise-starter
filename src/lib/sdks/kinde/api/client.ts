// eslint-disable-next-line import-x/no-unassigned-import
import '@/lib/sdks/kinde/auth';

// eslint-disable-next-line import-x/order
import { Users, Roles, Permissions, Organizations } from '@kinde/management-api-js';

export const usersApi = Users;
export const rolesApi = Roles;
export const permissionsApi = Permissions;
export const organizationsApi = Organizations;
