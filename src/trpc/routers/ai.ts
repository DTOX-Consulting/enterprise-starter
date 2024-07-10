import { z } from 'zod';

import { type GenerateParams, generateParams } from '@/lib/route/params';
import { createCompletion } from '@/lib/sdks/openai/api';
import { type DocumentType, availableDocuments } from '@/lib/sdks/openai/prompts';
import { publicProcedure } from '@/trpc';

import type { ChatCompletionRequestMessage } from 'openai-edge';

const [firstKey, ...rest] = availableDocuments;

export const aiRouter = {
  generator: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        tone: z.string().optional(),
        model: z.string().optional(),
        format: z.string().optional(),
        persona: z.string().optional(),
        document: z.enum([firstKey as unknown as DocumentType, ...rest])
      })
    )
    .mutation(async ({ input }) => {
      const { topic, tone, persona, format, model, prompt } = await generateParams(
        input as GenerateParams
      );

      if (!topic) {
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
          tone,
          model,
          prompt,
          format,
          persona
        });

        return { success: true, data };
      } catch (e) {
        const error = e as Error;
        return { success: false, error: error.message };
      }
    })
};
