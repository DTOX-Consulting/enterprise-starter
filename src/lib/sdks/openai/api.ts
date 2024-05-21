import { OpenAIStream, StreamingTextResponse } from 'ai';

import { getEnv, isDev } from '@/lib/env';
import { openai, openaiSdk } from '@/lib/sdks/openai/auth';
import {
  type ChatOptions,
  type ImageOptions,
  getChatOptions,
  getImageOptions,
  getSystemPrompts,
  getSystemPromptArgs
} from '@/lib/sdks/openai/helpers/prompt';
import { generateCallbackArgs } from '@/lib/sdks/openai/helpers/utils';

import type { StreamChatOptions } from '@/lib/sdks/openai/helpers/types';
import type { ChatCompletionRequestMessage, CreateChatCompletionResponse } from 'openai-edge';

export const createImageCompletion = async (imageOptions: ImageOptions) => {
  const options = getImageOptions(imageOptions);
  const response = await openaiSdk.images.generate(options);
  return response.data;
};

export const _createCompletion = async (
  _messages: ChatCompletionRequestMessage[],
  chatOptions: ChatOptions = {}
) => {
  const systemPromptArgs = getSystemPromptArgs(chatOptions);
  const { stream, temperature, model } = getChatOptions(chatOptions);

  const systemPrompt = await getSystemPrompts(systemPromptArgs, _messages);
  const messages = [...systemPrompt, ..._messages];

  return openai.createChatCompletion({
    model,
    stream,
    messages,
    temperature
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
      const { userId, chatId } = chatOptions;
      const args = generateCallbackArgs({
        userId,
        chatId,
        messages,
        completion,
        chatOptions
      });

      await chatOptions?.callback?.(args);

      if (!isDev() || getEnv('STORE_FINE_TUNE_DATA') !== 'true') {
        return;
      }

      // const { error } = await storeJsonL([
      //   ...(await getSystemPrompts(getSystemPromptArgs(chatOptions), messages)),
      //   ...args.messages
      // ]);

      // if(error) console.error(error);
    }
  });

  return new StreamingTextResponse(stream);
};
