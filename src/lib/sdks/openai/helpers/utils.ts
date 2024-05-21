import { kv } from '@vercel/kv';

import { nanoid } from '@/lib/utils';

import type { ChatOptions } from '@/lib/sdks/openai/helpers/prompt';
import type { CallbackArgs, GenerateCallbackArgs } from '@/lib/sdks/openai/helpers/types';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export const storeInRedis = async (
  userId: string,
  document: string,
  completion: string,
  chatOptions: ChatOptions,
  messages: ChatCompletionRequestMessage[]
) => {
  const chatId = `${userId}-${document}-${Date.now()}`;

  return storePayload(
    generateCallbackArgs({
      chatId,
      userId,
      messages,
      completion,
      chatOptions
    })
  );
};

export const storePayload = async (args: CallbackArgs) => {
  const payload = {
    id: args.id,
    userId: args.userId,
    messages: args.messages,
    path: `/chat/${args.id}`,
    createdAt: args.createdAt,
    title: args.messages[0]?.content?.substring(0, 30) ?? 'Untitled'
  };

  await kv.hmset(`chat:${payload.id}`, payload);
  await kv.zadd(`user:chat:${payload.userId}`, {
    member: `chat:${payload.id}`,
    score: payload.createdAt
  });
};

export function addCompletionToMessages(
  messages: ChatCompletionRequestMessage[],
  completion: string
): ChatCompletionRequestMessage[] {
  const _messages: ChatCompletionRequestMessage[] = JSON.parse(
    JSON.stringify(messages)
  ) as ChatCompletionRequestMessage[];

  return [
    ..._messages,
    {
      content: completion,
      role: 'assistant'
    }
  ];
}

export function generateCallbackArgs({
  userId,
  chatId,
  messages,
  completion,
  chatOptions
}: GenerateCallbackArgs): CallbackArgs {
  return {
    completion,
    chatOptions,
    createdAt: Date.now(),
    id: chatId ?? nanoid(),
    userId: userId ?? nanoid(),
    messages: addCompletionToMessages(messages, completion)
  };
}
