import { S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';

import { config } from '@/lib/sdks/cloudflare/r2/config';

export function createClient() {
  const clientConfig: S3ClientConfig = {
    region: 'auto',
    endpoint: `https://${config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.R2_ACCESS_KEY_ID,
      secretAccessKey: config.R2_SECRET_ACCESS_KEY
    }
  };

  return new S3Client(clientConfig);
}

export const client = createClient();
