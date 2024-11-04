import { errorResponse, routeHandler } from '@/lib/route';
import { getBody } from '@/lib/route/params';
import { type ChatRequestBodyWithMessages, streamCompletion } from '@/lib/sdks/openai/api';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// TRPC Cannot stream responses
export const POST = routeHandler(async (req: NextRequest): Promise<Response> => {
  const {
    messages,
    id: chatId,
    userId = 'temp-user-id'
  } = await getBody<ChatRequestBodyWithMessages>(req);

  if (!userId) {
    return errorResponse('Unauthorized', 401);
  }

  return streamCompletion(messages, {
    userId,
    chatId
  });
});
