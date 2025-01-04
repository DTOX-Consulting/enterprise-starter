import { G } from '@mobily/ts-belt';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { upload } from '@/lib/sdks/cloudflare/r2/utils';
import { parseDataURL } from '@/lib/utils/url';
import { protectedProcedure } from '@/trpc';

export const uploadRouter = {
  base64: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        dirPath: z.string(),
        dataUrl: z.string(),
        bucket: z.string()
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

      const result = await upload({
        ctx,
        name,
        dirPath,
        bucket,
        mimeType,
        fileContent
      });

      return {
        error: null,
        data: result,
        success: true
      };
    }),
  file: protectedProcedure
    .input(
      z.object({
        file: zfd.file(),
        name: z.string(),
        dirPath: z.string(),
        bucket: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, dirPath, file, bucket } = input;

      const { type: mimeType } = file;
      const data = await file.arrayBuffer();
      const fileContent = Buffer.from(data);

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
    })
};
