import { map as pMap } from 'already';

import { fromPromise, unbox } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';
import { listFiles, listFolders } from '@/lib/sdks/google/drive';

export const createPermissions = async (fileId: string, emailAddress: string, role: string) => {
  return fromPromise(
    drive.permissions
      .create({
        fileId,
        sendNotificationEmail: true,
        transferOwnership: role === 'owner',
        fields: config.drive.fields.permission,
        requestBody: {
          role,
          emailAddress,
          type: 'user'
        }
      })
      .then(({ data }) => data)
  );
};

export const updatePermissions = async (fileId: string, permissionId: string, role = 'reader') => {
  return fromPromise(
    drive.permissions
      .update({
        fileId,
        permissionId,
        fields: config.drive.fields.permission,
        requestBody: {
          role
        }
      })
      .then(({ data }) => data)
  );
};

export const listPermissions = async (fileId: string) => {
  return fromPromise(
    drive.permissions
      .list({
        fileId,
        fields: config.drive.fields.permissions
      })
      .then(({ data }) => data)
  );
};

export const hasPermissions = async (fileId: string, emailAddress: string) => {
  const { data: permissions } = unbox(await listPermissions(fileId));

  return permissions?.permissions?.some((permission) => {
    return permission?.emailAddress === emailAddress;
  });
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
  const { data } = unbox(await listFiles());

  return pMap(
    data?.files || [],
    async (file) => file?.id && createPermissions(file.id, emailAddress, role)
  );
};

export const shareFolders = async (emailAddress: string, role = 'reader') => {
  const { data } = unbox(await listFolders());

  return pMap(
    data?.files || [],
    async (file) => file?.id && createPermissions(file.id, emailAddress, role)
  );
};
