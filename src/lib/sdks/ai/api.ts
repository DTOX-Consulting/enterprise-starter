import { anthropic } from '@ai-sdk/anthropic';
import { google as gemini } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { openai } from '@ai-sdk/openai';
import {
  type CoreMessage,
  type CoreSystemMessage,
  generateText,
  streamText,
  generateObject,
  streamObject
} from 'ai';
import { match } from 'ts-pattern';

import {
  type ModelType,
  type OpenAIModel,
  type AnthropicModel,
  type MistralModel,
  type GeminiModel,
  OPENAI_MODELS,
  ANTHROPIC_MODELS,
  MISTRAL_MODELS,
  DEFAULT_MODEL,
  GEMINI_MODELS
} from '@/lib/sdks/ai/model';
import { AI_SYSTEM_CONTEXT } from '@/local/ai/constants';

import type { z } from 'zod';

export type ChatOptions = Readonly<{
  stream?: boolean;
  temperature?: number;
  model?: ModelType;
}>;

export type StreamChatOptions = Readonly<
  Omit<ChatOptions, 'stream'> & {
    callback?: (args: CallbackArgs) => Promise<void>;
    userId?: string;
    chatId?: string;
  }
>;

export type CallbackArgs = Readonly<{
  completion: string;
  chatOptions: ChatOptions;
  messages: CoreMessage[];
}>;

export type ChatRequestBody = Readonly<{
  id: string;
  userId?: string;
  isUnAuthenticated?: boolean;
}>;

export type ChatRequestBodyWithMessages = Readonly<
  ChatRequestBody & {
    messages: CoreMessage[];
  }
>;

export type GenerateObjectOptions<T> = Readonly<{
  schema: z.ZodType<T>;
  schemaName?: string;
  schemaDescription?: string;
  temperature?: number;
  model?: ModelType;
}>;

export type StreamObjectOptions<T> = Readonly<Omit<GenerateObjectOptions<T>, 'stream'>>;

// eslint-disable-next-line n/no-unsupported-features/node-builtins
export const streamToResponse = (stream: ReadableStream) =>
  new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  });

export const getSystemPrompt = (): CoreSystemMessage => ({
  role: 'system',
  content: AI_SYSTEM_CONTEXT
});

const getProviderModel = (model: ModelType) =>
  match(model)
    .when(
      (m) => OPENAI_MODELS.includes(m as OpenAIModel),
      () => openai(model as OpenAIModel)
    )
    .when(
      (m) => ANTHROPIC_MODELS.includes(m as AnthropicModel),
      () => anthropic(model)
    )
    .when(
      (m) => MISTRAL_MODELS.includes(m as MistralModel),
      () => mistral(model)
    )
    .when(
      (m) => GEMINI_MODELS.includes(m as GeminiModel),
      () => gemini(model)
    )
    .otherwise(() => {
      throw new Error(`Unknown model: ${model}`);
    });

export const createCompletion = async (messages: CoreMessage[], chatOptions: ChatOptions = {}) => {
  const model = chatOptions.model ?? DEFAULT_MODEL;
  const providerModel = getProviderModel(model);

  return generateText({
    messages,
    model: providerModel,
    temperature: chatOptions.temperature
  });
};

export const streamCompletion = async (
  messages: CoreMessage[],
  chatOptions: StreamChatOptions = {}
) => {
  const model = chatOptions.model ?? DEFAULT_MODEL;
  const providerModel = getProviderModel(model);

  const result = await streamText({
    messages,
    model: providerModel,
    temperature: chatOptions.temperature
  });

  return result.textStream;
};

export const generateStructuredData = async <T>(
  messages: CoreMessage[],
  options: GenerateObjectOptions<T>
): Promise<T> => {
  const { schema, schemaName, schemaDescription, temperature, model = DEFAULT_MODEL } = options;
  const providerModel = getProviderModel(model);

  const { object } = await generateObject({
    schema,
    messages,
    schemaName,
    temperature,
    schemaDescription,
    model: providerModel
  });

  return object;
};

export const streamStructuredData = async <T>(
  messages: CoreMessage[],
  options: StreamObjectOptions<T>
) => {
  const { schema, schemaName, schemaDescription, temperature, model = DEFAULT_MODEL } = options;
  const providerModel = getProviderModel(model);

  const result = await streamObject({
    schema,
    messages,
    schemaName,
    temperature,
    schemaDescription,
    model: providerModel
  });

  return result.partialObjectStream;
};
