import { type NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
import { routeHandler } from '@/lib/route';
import { getGenerateParams } from '@/lib/route/params';
import { streamCompletion } from '@/lib/sdks/openai/api';

import type { ChatCompletionRequestMessage } from 'openai-edge';

export const runtime = 'edge';

export const GET = routeHandler(async (request: NextRequest) => run(request));
export const POST = routeHandler(async (request: NextRequest) => run(request));

const run = async (request: NextRequest) => {
  const { topic, tone, persona, format, model, prompt } = await getGenerateParams(request);

  if (!topic) {
    return NextResponse.json({
      success: false,
      error: 'Missing topic'
    });
  }

  logger.info(
    {
      tone,
      model,
      prompt,
      format,
      persona,
      topic: topic.substring(0, 50)
    },
    'Generating Document'
  );

  try {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'user',
        content: `TOPIC: ${topic}`
      }
    ];
    return streamCompletion(messages, {
      tone,
      model,
      prompt,
      format,
      persona
    });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ success: false, error: error.message });
  }
};
