import { map as pMap } from 'already';

import { fromPromise, unboxR } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';
import { bufferToStream } from '@/lib/utils/buffer';

export const getFile = async (fileId: string) => {
  const response = await drive.files.get({
    fileId,
    fields: config.drive.fields.files
  });
  return fromPromise(Promise.resolve(response.data));
};

export const createFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain'
) => {
  const response = await drive.files.create({
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
  });
  return fromPromise(Promise.resolve(response.data));
};

export const updateFile = async (
  fileId: string,
  body: string | Buffer,
  mimeType = 'text/plain'
) => {
  const response = await drive.files.update({
    fileId,
    uploadType: 'resumable',
    supportsAllDrives: true,
    fields: config.drive.fields.files,
    includePermissionsForView: 'published',
    media: {
      mimeType,
      body: await bufferToStream(body)
    }
  });
  return fromPromise(Promise.resolve(response.data));
};

export const getOrCreateFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain'
) => {
  const { data: maybeFile } = unboxR(await findFileByName(name, parent));
  const file = maybeFile?.files?.[0];

  return file ? file : unboxR(await createFile(name, body, parent, mimeType)).data;
};

export const createOrOverwriteFile = async (
  name: string,
  body: string | Buffer,
  parent: string = config.drive.directories.public.id,
  mimeType = 'text/plain',
  shouldDelete = false
) => {
  const { data: maybeFile } = unboxR(await findFileByName(name, parent));
  const fileId = maybeFile?.files?.[0]?.id;

  if (fileId && fileId.length > 0) {
    if (shouldDelete) {
      await deleteFile(fileId);
    } else {
      return unboxR(await updateFile(fileId, body, mimeType)).data;
    }
  }

  return unboxR(await createFile(name, body, parent, mimeType)).data;
};

export const findFileByName = async (name: string, parent?: string) => {
  const query = `mimeType != "application/vnd.google-apps.folder" and trashed = false and name = "${name}"${
    parent ? `and '${parent}' in parents` : ''
  }`;
  const response = await drive.files.list({
    corpora: 'allDrives',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: config.drive.fields.folders,
    // eslint-disable-next-line id-length
    q: query
  });
  return fromPromise(Promise.resolve(response.data));
};

export const listFiles = async (_path?: string) => {
  const response = await drive.files.list({
    corpora: 'allDrives',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    fields: config.drive.fields.folders,
    // eslint-disable-next-line id-length
    q: 'mimeType != "application/vnd.google-apps.folder"'
  });
  return fromPromise(Promise.resolve(response.data));
};

export const deleteFile = async (fileId: string) => {
  const response = await drive.files.delete({
    fileId
  });
  return fromPromise(Promise.resolve(response.data));
};

export const moveFile = async (fileId: string, toAdd: string[], toRemove: string[]) => {
  if (toAdd.length > 0 && toRemove.length > 0) {
    const response = await drive.files.update({
      fileId,
      addParents: toAdd.join(','),
      removeParents: toRemove.join(',')
    });
    return fromPromise(Promise.resolve(response.data));
  }
  throw new Error('Both toAdd and toRemove arrays must have at least one element.');
};

export const deleteAllFiles = async () => {
  const { data } = unboxR(await listFiles());
  return pMap(data?.files ?? [], async (file) => {
    if (file.id && file.id.length > 0) {
      return deleteFile(file.id);
    }
  });
};
