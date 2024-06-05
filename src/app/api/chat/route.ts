import { errorResponse, routeHandler } from '@/lib/route';
import { getBody } from '@/lib/route/params';
import { getModel, isBot as isInteractiveBot } from '@/lib/sdks/openai';
import { streamCompletion } from '@/lib/sdks/openai/api';
import { storePayload } from '@/lib/sdks/openai/helpers/utils';

import type { ToneType } from '@/lib/sdks/openai';
import type { ChatRequestBodyWithMessages, ChatOptions } from '@/lib/sdks/openai/helpers/prompt';
import type { StreamChatOptions } from '@/lib/sdks/openai/helpers/types';
import type { StreamingTextResponse } from 'ai';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// TRPC Cannot stream responses
export const POST = routeHandler(async (req: NextRequest): Promise<StreamingTextResponse> => {
  const {
    bot,
    messages,
    id: chatId,
    isUnAuthenticated
  } = await getBody<ChatRequestBodyWithMessages>(req);

  const userId = 'external';

  if (!userId) {
    return errorResponse('Unauthorized', 401);
  }

  const { tone, isBot, prompt, model, callback } = getArgs({ bot, isUnAuthenticated });

  return streamCompletion(messages, {
    tone,
    isBot,
    model,
    prompt,
    chatId,
    userId,
    callback
  });
});

const getArgs = ({
  bot,
  isUnAuthenticated
}: {
  isUnAuthenticated?: boolean;
  bot?: ChatRequestBodyWithMessages['bot'];
}): StreamChatOptions => {
  let isBot = false;
  const model = getModel('gpt3');
  const tone: ToneType = 'conversational';
  let prompt: ChatOptions['prompt'] = undefined;
  let callback: StreamChatOptions['callback'] = storePayload;

  if (bot && isInteractiveBot(bot) && !isUnAuthenticated) {
    isBot = true;
    prompt = bot;
  }

  // For costs
  callback = undefined;
  return { isBot, tone, prompt, callback, model };
};
