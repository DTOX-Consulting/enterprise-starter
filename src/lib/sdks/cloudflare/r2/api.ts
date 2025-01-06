import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutObjectCommand
} from '@aws-sdk/client-s3';
import { unbox } from 'unbox-js';

import { client } from '@/lib/sdks/cloudflare/r2/client';

async function checkBucketExists(bucketName: string) {
  const { error } = await unbox(client.send(new HeadBucketCommand({ Bucket: bucketName })));
  if (error) {
    if (error.name === 'NotFound') {
      return false;
    }

    console.error(`Error checking if bucket exists ${bucketName}:`, error);
    throw error;
  }

  return true;
}

async function createBucket(bucketName: string) {
  const { error } = await unbox(client.send(new CreateBucketCommand({ Bucket: bucketName })));

  if (error) {
    console.error(`Error creating bucket ${bucketName}:`, error);
    throw error;
  }
}

export async function deleteFile(bucketName: string, fileKey: string) {
  await client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: fileKey }));
}

async function ensureBucketExists(bucketName: string) {
  const exists = await checkBucketExists(bucketName);
  if (!exists) {
    await createBucket(bucketName);
  }
}

export async function uploadFile({
  fileKey,
  bucketName,
  fileContent,
  contentType
}: {
  fileKey: string;
  bucketName: string;
  fileContent: Buffer;
  contentType: string;
}) {
  await ensureBucketExists(bucketName);

  const params = {
    Key: fileKey,
    Body: fileContent,
    Bucket: bucketName,
    ContentType: contentType
  };

  await client.send(new PutObjectCommand(params));
}

export async function retrieveFile({
  fileKey,
  bucketName
}: { fileKey: string; bucketName: string }) {
  const { data, error } = await unbox(
    client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        ResponseCacheControl: 'no-cache, no-store, must-revalidate'
      })
    )
  );
  if (error) {
    console.error(`Error retrieving file ${fileKey} from bucket ${bucketName}:`, error);
    throw error;
  }

  return data;
}
