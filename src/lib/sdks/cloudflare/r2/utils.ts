import { uploadFile, retrieveFile } from '@/lib/sdks/cloudflare/r2/api';
import { config } from '@/lib/sdks/cloudflare/r2/config';
import { hash } from '@/lib/utils/string';

import type { ContextWithOptionalUser } from '@/trpc/types';

export function getFileUrl(bucket: string, key: string) {
  return `https://${bucket}.${config.R2_DOMAIN}/${key}`;
}

export function getFileKey(ctx: ContextWithOptionalUser, name: string, dirPath: string) {
  return `${hash(ctx.session.user?.id ?? '')}/${dirPath}/${name}`;
}

export const upload = async ({
  ctx,
  name,
  bucket,
  dirPath,
  mimeType,
  fileContent
}: {
  name: string;
  tmp?: boolean;
  bucket: string;
  dirPath: string;
  mimeType: string;
  fileContent: Buffer;
  ctx: ContextWithOptionalUser;
}) => {
  const key = getFileKey(ctx, name, dirPath);
  const url = getFileUrl(bucket, key);

  await uploadFile({
    fileContent,
    fileKey: key,
    bucketName: bucket,
    contentType: mimeType
  });

  return {
    url,
    key
  };
};

export const retrieve = async ({
  ctx,
  name,
  bucket,
  dirPath
}: {
  name: string;
  bucket: string;
  dirPath: string;
  ctx: ContextWithOptionalUser;
}) => {
  const key = getFileKey(ctx, name, dirPath);
  const url = getFileUrl(bucket, key);

  const data = await retrieveFile({
    fileKey: key,
    bucketName: bucket
  });

  return {
    url,
    key,
    data
  };
};
