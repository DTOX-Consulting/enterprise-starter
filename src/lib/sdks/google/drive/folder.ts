import { map as pMap } from 'already';

import { fromPromise, unboxR } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';

export const getFolder = async (fileId: string) => {
  return fromPromise(
    drive.files
      .get({
        fileId,
        fields: config.drive.fields.files
      })
      .then(({ data }) => data)
  );
};

export const createFolder = async (
  name: string,
  parent: string = config.drive.directories.public.id
) => {
  return fromPromise(
    drive.files
      .create({
        supportsAllDrives: true,
        fields: config.drive.fields.files,
        includePermissionsForView: 'published',
        requestBody: {
          name,
          parents: [parent],
          mimeType: 'application/vnd.google-apps.folder'
        }
      })
      .then(({ data }) => data)
  );
};

export const updateFolder = async (fileId: string, name: string) => {
  return fromPromise(
    drive.files
      .update({
        fileId,
        supportsAllDrives: true,
        fields: config.drive.fields.files,
        includePermissionsForView: 'published',
        requestBody: {
          name
        }
      })
      .then(({ data }) => data)
  );
};

export const getOrCreateFolder = async (
  name: string,
  parent: string = config.drive.directories.public.id
) => {
  const { data: maybeFolder } = unboxR(await findFolderByName(name, parent));
  const folder = maybeFolder?.files?.[0];

  return folder ? folder : unboxR(await createFolder(name, parent))?.data;
};

export const createOrOverwriteFolder = async (
  name: string,
  parent: string = config.drive.directories.public.id
) => {
  const { data: maybeFolder } = unboxR(await findFolderByName(name, parent));
  const folderId = maybeFolder?.files?.[0]?.id;

  folderId && unboxR(await deleteFolder(folderId));
  return unboxR(await createFolder(name, parent))?.data;
};

export const findFolderByName = async (name: string, parent?: string) => {
  return fromPromise(
    drive.files
      .list({
        corpora: 'allDrives',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: config.drive.fields.folders,
        q: `mimeType = "application/vnd.google-apps.folder" and trashed = false and name = "${name}"${
          parent ? `and '${parent}' in parents` : ''
        }`
      })
      .then(({ data }) => data)
  );
};

export const listFolders = async (path?: string) => {
  return fromPromise(
    drive.files
      .list({
        corpora: 'allDrives',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: config.drive.fields.folders,
        q: 'mimeType = "application/vnd.google-apps.folder"'
      })
      .then(({ data }) => data)
  );
};

export const deleteFolder = async (fileId: string) => {
  return fromPromise(
    drive.files
      .delete({
        fileId
      })
      .then(({ data }) => data)
  );
};

export const moveFolder = async (fileId: string, toAdd: string[], toRemove: string[]) => {
  return fromPromise(
    drive.files
      .update({
        fileId,
        addParents: toAdd.join(','),
        removeParents: toRemove.join(',')
      })
      .then(({ data }) => data)
  );
};

export const deleteAllFolders = async () => {
  const { data } = unboxR(await listFolders());
  return pMap(data?.files || [], async (file) => file?.id && deleteFolder(file.id));
};
