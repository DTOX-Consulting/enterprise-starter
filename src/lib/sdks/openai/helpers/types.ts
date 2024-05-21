import type { BotType } from '@/lib/sdks/openai';
import type { ChatOptions } from '@/lib/sdks/openai/helpers/prompt';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export type CompletionRequestMessage = ChatCompletionRequestMessage & {
  bot?: BotType;
};

export type CallbackArgs = {
  id: string;
  userId: string;
  chatId?: string;
  createdAt: number;
  completion: string;
  chatOptions: ChatOptions;
  messages: ChatCompletionRequestMessage[];
};

export type GenerateCallbackArgs = Omit<CallbackArgs, 'id' | 'userId' | 'createdAt'> & {
  merge?: boolean;
  userId?: string;
  createdAt?: number;
};

export type StreamChatOptions = Omit<ChatOptions, 'stream'> & {
  callback?: (args: CallbackArgs) => Promise<void>;
  userId?: string;
  chatId?: string;
};
