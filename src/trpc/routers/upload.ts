import { G } from '@mobily/ts-belt';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { upload, retrieve } from '@/lib/sdks/cloudflare/r2/utils';
import { isFileLike } from '@/lib/utils/file';
import { parseDataURL } from '@/lib/utils/url';
import { protectedProcedure } from '@/trpc';
import { protectedFormDataProcedure } from '@/trpc/formdata';

import type { ContextWithOptionalUser } from '@/trpc/types';

// Custom Zod validator for File
const zFile = z.custom<File>((file) => isFileLike(file), 'Input must be a File');

export const uploadRouter = {
  base64: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bucket: z.string(),
        dirPath: z.string(),
        dataUrl: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, dirPath, dataUrl, bucket } = input;
      const { data, mimeType } = parseDataURL(dataUrl);

      if (G.isNullable(data) || G.isNullable(mimeType)) {
        return {
          data: null,
          success: false,
          error: 'Invalid data URL'
        };
      }

      const fileContent = Buffer.from(data, 'base64');
      return uploadFile({ ctx, name, bucket, dirPath, mimeType, fileContent });
    }),
  formData: protectedFormDataProcedure
    .input(
      zfd.formData({
        file: zFile,
        name: zfd.text(),
        bucket: zfd.text(),
        dirPath: zfd.text()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { file, name, dirPath, bucket } = input;
      return handleFile({ ctx, file, name, dirPath, bucket });
    }),
  file: protectedProcedure
    .input(
      z.object({
        file: zFile,
        name: z.string(),
        bucket: z.string(),
        dirPath: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, dirPath, file, bucket } = input;
      return handleFile({ ctx, file, name, dirPath, bucket });
    }),
  retrieve: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bucket: z.string(),
        dirPath: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      const { name, bucket, dirPath } = input;
      return retrieveFile({ ctx, name, bucket, dirPath });
    })
};

const handleFile = async ({
  ctx,
  file,
  name,
  dirPath,
  bucket
}: {
  file: File;
  name: string;
  bucket: string;
  dirPath: string;
  ctx: ContextWithOptionalUser;
}) => {
  const mimeType = file.type;
  const data = await file.arrayBuffer();
  const fileContent = Buffer.from(data);

  if (G.isNullable(data) || G.isNullable(mimeType)) {
    return {
      data: null,
      success: false,
      error: 'Invalid file type'
    };
  }

  return uploadFile({ ctx, name, bucket, dirPath, mimeType, fileContent });
};

const uploadFile = async ({
  ctx,
  name,
  bucket,
  dirPath,
  mimeType,
  fileContent
}: {
  name: string;
  bucket: string;
  dirPath: string;
  mimeType: string;
  fileContent: Buffer;
  ctx: ContextWithOptionalUser;
}) => {
  const result = await upload({
    ctx,
    name,
    bucket,
    dirPath,
    mimeType,
    fileContent
  });

  return {
    error: null,
    data: result,
    success: true
  };
};

const retrieveFile = async ({
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
  const result = await retrieve({ ctx, name, bucket, dirPath });

  return {
    error: null,
    data: result,
    success: true
  };
};
