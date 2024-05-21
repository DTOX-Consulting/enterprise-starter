import { logger } from '@/lib/logger';
import { routeHandler, successResponse } from '@/lib/route';
import { getParams } from '@/lib/route/params';
import { createImageCompletion } from '@/lib/sdks/openai/api';

import type { NN } from '@/lib/types';
import type { NextRequest } from 'next/server';
import type { ImageGenerateParams } from 'openai/resources/images';

export const runtime = 'edge';

type Params = Omit<NN<ImageGenerateParams>, 'user' | 'n'> & {
  n: string;
};

const paramKeys: (keyof Params)[] = [
  'n',
  'size',
  'model',
  'style',
  'prompt',
  'quality',
  'response_format'
];

export const GET = routeHandler(async (request: NextRequest) => run(request));
export const POST = routeHandler(async (request: NextRequest) => run(request));

const run = async (request: NextRequest) => {
  const imageOptions = await getParams<Params>(request, paramKeys);

  logger.info({ imageOptions }, 'Generating Image');

  const data = await createImageCompletion(imageOptions);
  return successResponse({ data });
};
