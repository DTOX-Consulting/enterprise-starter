import { map as pMap } from 'already';

import { bufferToStream } from '@/lib/buffer';
import { fromPromise, unbox } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';

export const getFile = async (fileId: string) => {
  return fromPromise(
    drive.files
      .get({
        fileId,
        fields: config.drive.fields.files
      })
      .then(({ data }) => data)
  );
};

export const createFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain'
) => {
  return fromPromise(
    drive.files
      .create({
        uploadType: 'resumable',
        supportsAllDrives: true,
        fields: config.drive.fields.files,
        includePermissionsForView: 'published',
        requestBody: {
          name,
          mimeType,
          parents: [parent]
        },
        media: {
          mimeType,
          body: await bufferToStream(body)
        }
      })
      .then(({ data }) => data)
  );
};

export const updateFile = async (
  fileId: string,
  body: string | Buffer,
  mimeType = 'text/plain'
) => {
  return fromPromise(
    drive.files
      .update({
        fileId,
        uploadType: 'resumable',
        supportsAllDrives: true,
        fields: config.drive.fields.files,
        includePermissionsForView: 'published',
        media: {
          mimeType,
          body: await bufferToStream(body)
        }
      })
      .then(({ data }) => data)
  );
};

export const getOrCreateFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain'
) => {
  const { data: maybeFile } = unbox(await findFileByName(name, parent));
  const file = maybeFile?.files?.[0];

  return file ? file : unbox(await createFile(name, body, parent, mimeType))?.data;
};

export const createOrOverwriteFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain',
  shouldDelete = false
) => {
  const { data: maybeFile } = unbox(await findFileByName(name, parent));
  const fileId = maybeFile?.files?.[0]?.id;

  if (fileId && shouldDelete) {
    await deleteFile(fileId);
  }

  const file =
    fileId && !shouldDelete
      ? unbox(await updateFile(fileId, body, mimeType))
      : unbox(await createFile(name, body, parent, mimeType));

  return file.data;
};

export const findFileByName = async (name: string, parent?: string) => {
  return fromPromise(
    drive.files
      .list({
        corpora: 'allDrives',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: config.drive.fields.folders,
        q: `mimeType != "application/vnd.google-apps.folder" and trashed = false and name = "${name}"${
          parent ? `and '${parent}' in parents` : ''
        }`
      })
      .then(({ data }) => data)
  );
};

export const listFiles = async (_path?: string) => {
  return fromPromise(
    drive.files
      .list({
        corpora: 'allDrives',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        fields: config.drive.fields.folders,
        q: 'mimeType != "application/vnd.google-apps.folder"'
      })
      .then(({ data }) => data)
  );
};

export const deleteFile = async (fileId: string) => {
  return fromPromise(
    drive.files
      .delete({
        fileId
      })
      .then(({ data }) => data)
  );
};

export const moveFile = async (fileId: string, toAdd: string[], toRemove: string[]) => {
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

export const deleteAllFiles = async () => {
  const { data } = unbox(await listFiles());
  return pMap(data?.files || [], async (file) => file?.id && deleteFile(file.id));
};
