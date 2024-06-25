import { OpenAIStream, StreamingTextResponse } from 'ai';

import { openai, openaiSdk } from '@/lib/sdks/openai/auth';

import type { NN } from '@/lib/types';
import type { ImageGenerateParams } from 'openai/resources/images';
import type { ChatCompletionRequestMessage, CreateChatCompletionResponse } from 'openai-edge';

export type ModelType = 'gpt-3.5-turbo' | 'gpt-4-turbo' | 'gpt-4-o';

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
  messages: ChatCompletionRequestMessage[];
};

export type ChatRequestBody = {
  id: string;
  userId?: string;
  isUnAuthenticated?: boolean;
};

export type ChatRequestBodyWithMessages = ChatRequestBody & {
  messages: ChatCompletionRequestMessage[];
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

export const createImageCompletion = async (imageOptions: ImageOptions) => {
  const response = await openaiSdk.images.generate(imageOptions);
  return response.data;
};

export const _createCompletion = async (
  _messages: ChatCompletionRequestMessage[],
  chatOptions: ChatOptions = {}
) => {
  return openai.createChatCompletion({
    messages: _messages,
    stream: chatOptions.stream,
    temperature: chatOptions.temperature,
    model: chatOptions.model ?? 'gpt-3.5-turbo'
  });
};

export const createCompletion = async (
  messages: ChatCompletionRequestMessage[],
  chatOptions: ChatOptions = {}
) => {
  const response = await _createCompletion(messages, chatOptions);
  const responseData = (await response.json()) as CreateChatCompletionResponse;
  return responseData.choices[0]?.message?.content;
};

export const streamCompletion = async (
  messages: ChatCompletionRequestMessage[],
  chatOptions: StreamChatOptions = {}
) => {
  const completionResponse = await _createCompletion(messages, {
    ...chatOptions,
    stream: true
  });

  const stream = OpenAIStream(completionResponse, {
    async onCompletion(completion) {
      await chatOptions?.callback?.({
        messages: messages,
        completion: completion,
        chatOptions: chatOptions
      });
    }
  });

  return new StreamingTextResponse(stream);
};
