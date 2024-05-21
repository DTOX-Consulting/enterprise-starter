import { D } from '@mobily/ts-belt';

import {
  getBot,
  getTone,
  getModel,
  getPrompt,
  getFormat,
  getPersona,
  getBotMeta,
  getBotModel,
  getSystemPrompt
} from '@/lib/sdks/openai';
import { findBot } from '@/lib/sdks/openai/helpers/find-bot';

import type {
  BotType,
  ToneType,
  FormatType,
  PromptType,
  PersonaType,
  ModelValueType
} from '@/lib/sdks/openai';
import type { NN } from '@/lib/types';
import type { ImageGenerateParams } from 'openai/resources/images';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export type ChatOptions = {
  isBot?: boolean;
  stream?: boolean;
  temperature?: number;
  tone?: ToneType;
  format?: FormatType;
  persona?: PersonaType;
  model?: ModelValueType;
  prompt?: PromptType | BotType;
};

export type SystemPromptArgs = Required<
  Pick<ChatOptions, 'tone' | 'persona' | 'format' | 'prompt' | 'isBot'>
>;

export type ChatRequestBody = {
  id: string;
  bot?: BotType;
  isUnAuthenticated?: boolean;
};

export type ChatRequestBodyWithMessages = ChatRequestBody & {
  messages: ChatCompletionRequestMessage[];
};

export const defaultChatOptions: Required<ChatOptions> = {
  isBot: false,
  stream: false,
  temperature: 0.7,
  format: 'plain',
  persona: 'customer',
  tone: 'professional',
  model: getModel('gpt3'),
  prompt: 'businessConsultant'
};

export const getChatOptions = (chatOptions: ChatOptions = {}): Required<ChatOptions> => {
  const options: Required<ChatOptions> = {
    ...defaultChatOptions,
    ...chatOptions
  };

  options.model = options.isBot ? getBotModel(options.prompt as BotType) : options.model;
  return options;
};

export const getSystemPromptArgs = (chatOptions: ChatOptions = {}): SystemPromptArgs => {
  return D.selectKeys(getChatOptions(chatOptions), [
    'tone',
    'isBot',
    'format',
    'prompt',
    'persona'
  ]);
};

export const getSystemPrompts = async (
  args: SystemPromptArgs,
  messages: ChatCompletionRequestMessage[]
): Promise<ChatCompletionRequestMessage[]> => {
  if (args.prompt === 'none') {
    return [];
  }

  if (!args.isBot) {
    return [
      {
        role: 'system',
        content: generateSystemPromptContent(args, messages)
      }
    ];
  }

  const foundBotPrompt = await findBotPrompt(args.prompt as BotType, messages);
  if (messages[0]) messages[0].name = foundBotPrompt;

  return [
    {
      role: 'system',
      name: foundBotPrompt,
      content: generateSystemPromptContent(args, messages, foundBotPrompt)
    }
  ];
};

const generateSystemPromptContent = (
  { tone, prompt, format, persona, isBot }: SystemPromptArgs,
  messages: ChatCompletionRequestMessage[],
  foundBotPrompt?: BotType
): string =>
  `
${getSystemPrompt('pre')}\n
${getSystemPrompt('profiles')}\n
${getTone(tone)}\n
${getPersona(persona)}
${!isBot ? getPrompt(prompt as PromptType) : _getBot(prompt as BotType, messages, foundBotPrompt!)}\n
${getSystemPrompt('post')}\n
${getFormat(format)}
`.trim();

const findBotPrompt = async (
  prompt: BotType,
  messages: ChatCompletionRequestMessage[]
): Promise<BotType> => {
  const messagesLength = messages.length;
  const botMeta = getBotMeta(prompt);

  if (messagesLength <= 1 || !botMeta.bots?.length) {
    return prompt;
  }

  const lastMessage = messages[messagesLength - 1]?.content ?? '';
  const previousMessage = messages[messagesLength - 3]?.content ?? '';

  return findBot(prompt, lastMessage, previousMessage);
};

const _getBot = (
  prompt: BotType,
  messages: ChatCompletionRequestMessage[],
  foundBotPrompt: BotType
): string => {
  const bot = getBot(prompt);
  const botMeta = getBotMeta(prompt);
  const messagesLength = messages.length;

  if (messagesLength <= 1 || !botMeta.bots?.length) {
    return bot(messages);
  }

  return getBot(foundBotPrompt)(messages);
};

// Image
export type ImageOptions = Omit<ImageGenerateParams, 'n' | 'user'> & { n?: string | number };

export const defaultImageOptions: NN<ImageOptions> = {
  n: '1',
  prompt: '',
  style: 'vivid',
  model: 'dall-e-2',
  size: '1024x1024',
  quality: 'standard',
  response_format: 'url'
};

export const getImageOptions = (imageOptions: ImageOptions): NN<ImageOptions & { n: number }> => {
  const options = {
    ...defaultImageOptions,
    ...imageOptions
  };

  if (options.model === 'dall-e-3') {
    options.n = 1;
  }

  if (typeof options.n === 'string') {
    options.n = Number.parseInt(options.n, 10);
  }

  return options as NN<ImageOptions & { n: number }>;
};
