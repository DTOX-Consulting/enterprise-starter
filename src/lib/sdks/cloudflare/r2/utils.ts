import { uploadFile } from '@/lib/sdks/cloudflare/r2/api';
import { config } from '@/lib/sdks/cloudflare/r2/config';
import { hash } from '@/lib/utils/string';

type Context = {
  session: {
    user: {
      id: string;
    };
  };
};

export const upload = async ({
  ctx,
  name,
  bucket,
  dirPath,
  mimeType,
  fileContent
}: {
  ctx: Context;
  name: string;
  tmp?: boolean;
  bucket: string;
  dirPath: string;
  mimeType: string;
  fileContent: Buffer;
}) => {
  const key = `${hash(ctx.session.user.id)}/${dirPath}/${name}`;
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

export function getFileUrl(bucket: string, key: string) {
  return `https://${bucket}.${config.R2_DOMAIN}/${key}`;
}
