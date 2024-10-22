import { map as pMap } from 'already';

import { fromPromise, unboxR } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';
import { listFiles, listFolders } from '@/lib/sdks/google/drive';

export const createPermissions = async (fileId: string, emailAddress: string, role: string) => {
  const response = await drive.permissions.create({
    fileId,
    sendNotificationEmail: true,
    transferOwnership: role === 'owner',
    fields: config.drive.fields.permission,
    requestBody: {
      role,
      emailAddress,
      type: 'user'
    }
  });
  return fromPromise(Promise.resolve(response.data));
};

export const updatePermissions = async (fileId: string, permissionId: string, role = 'reader') => {
  const response = await drive.permissions.update({
    fileId,
    permissionId,
    fields: config.drive.fields.permission,
    requestBody: {
      role
    }
  });
  return fromPromise(Promise.resolve(response.data));
};

export const listPermissions = async (fileId: string) => {
  const response = await drive.permissions.list({
    fileId,
    fields: config.drive.fields.permissions
  });
  return fromPromise(Promise.resolve(response.data));
};

export const hasPermissions = async (fileId: string, emailAddress: string) => {
  const { data: permissions } = unboxR(await listPermissions(fileId));

  return permissions?.permissions?.some((permission) => permission.emailAddress === emailAddress) ?? false;
};

export const createPermissionsIfNotExists = async (
  fileId: string,
  emailAddress: string,
  role = 'reader'
) => {
  if (!(await hasPermissions(fileId, emailAddress))) {
    return createPermissions(fileId, emailAddress, role);
  }
};

export const shareFiles = async (emailAddress: string, role = 'reader') => {
  const { data } = unboxR(await listFiles());

  return pMap(
    data?.files ?? [],
    async (file) => file.id ? createPermissions(file.id, emailAddress, role) : undefined
  );
};

export const shareFolders = async (emailAddress: string, role = 'reader') => {
  const { data } = unboxR(await listFolders());

  return pMap(
    data?.files ?? [],
    async (file) => file.id ? createPermissions(file.id, emailAddress, role) : undefined
  );
};
