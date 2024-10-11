import { z } from 'zod';

import {
  createCompletion,
  createImageCompletion,
  type GenerateImageParams,
  type GenerateParams
} from '@/lib/sdks/openai/api';
import { publicProcedure } from '@/trpc';

import type { ChatCompletionRequestMessage } from 'openai-edge';

export const aiRouter = {
  generator: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        model: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const { topic, model } = input as GenerateParams;

      if (topic === null) {
        return {
          success: false,
          error: 'Missing topic'
        };
      }
      try {
        const messages: ChatCompletionRequestMessage[] = [
          {
            role: 'user',
            content: topic
          }
        ];

        const data = await createCompletion(messages, {
          model
        });

        return { success: true, data };
      } catch (err) {
        const error = err as Error;
        return { success: false, error: error.message };
      }
    }),
  image: publicProcedure
    .input(
      z.object({
        n: z.number(),
        size: z.string().optional(),
        model: z.string().optional(),
        style: z.string().optional(),
        prompt: z.string().optional(),
        quality: z.string().optional(),
        response_format: z.string().optional()
      })
    )
    .mutation(async ({ input }) => {
      const imageOptions = input as GenerateImageParams;

      try {
        const data = await createImageCompletion(imageOptions);
        return { success: true, data };
      } catch (err) {
        const error = err as Error;
        return { success: false, error: error.message };
      }
    })
};
