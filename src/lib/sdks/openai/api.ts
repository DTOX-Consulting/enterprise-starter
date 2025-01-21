import { openai as aiOpenai } from '@ai-sdk/openai';
import { type CoreMessage, type CoreSystemMessage, streamText } from 'ai';

import { openai } from '@/lib/sdks/openai/client';
import { AI_SYSTEM_CONTEXT } from '@/local/ai/constants';

import type { ModelType } from '@/lib/sdks/openai/model';
import type { NN } from '@/lib/types';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import type { ImageGenerateParams } from 'openai/resources/images.mjs';

export type ChatOptions = {
  stream?: boolean;
  temperature?: number;
  model?: ModelType;
};

export type StreamChatOptions = Omit<ChatOptions, 'stream'> & {
  callback?: (args: CallbackArgs) => Promise<void>;
  userId?: string;
  chatId?: string;
};

export type CallbackArgs = {
  completion: string;
  chatOptions: ChatOptions;
  messages: ChatCompletionMessageParam[];
};

export type ChatRequestBody = {
  id: string;
  userId?: string;
  isUnAuthenticated?: boolean;
};

export type ChatRequestBodyWithMessages = ChatRequestBody & {
  messages: CoreMessage[];
};

export type ImageOptions = Omit<ImageGenerateParams, 'n' | 'user'> & { n?: number };

export type GenerateImageParams = Omit<NN<ImageGenerateParams>, 'user'>;

export type GenerateParams = {
  topic?: string;
  model?: ModelType;
};

export type GenerateParamsResult = {
  topic: string;
};

export const DEFAULT_AI_MODEL = 'gpt-4o-mini';

export const getSystemPrompt = (): CoreSystemMessage => ({
  role: 'system',
  content: AI_SYSTEM_CONTEXT
});

export const createImageCompletion = async (imageOptions: ImageOptions) => {
  const response = await openai.images.generate(imageOptions);
  return response.data;
};

export const createCompletion = async (
  _messages: ChatCompletionMessageParam[],
  chatOptions: ChatOptions = {}
) => {
  const messages = [getSystemPrompt(), ..._messages];

  const completion = await openai.chat.completions.create({
    model: chatOptions.model ?? DEFAULT_AI_MODEL,
    temperature: chatOptions.temperature,
    messages
  });

  return completion.choices[0]?.message?.content ?? '';
};

export const streamCompletion = async (
  _messages: CoreMessage[],
  chatOptions: StreamChatOptions = {}
) => {
  const messages = [getSystemPrompt(), ..._messages];

  const stream = await streamText({
    model: aiOpenai(chatOptions.model ?? DEFAULT_AI_MODEL),
    temperature: chatOptions.temperature,
    messages
  });

  return stream.toDataStreamResponse();
};
