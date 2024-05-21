import { unbox } from 'unbox-js';


import { type SendArgs, send } from '@/app/api/mail/utils/send';
import { sendResponse, routeHandler } from '@/lib/route';
import { getBody } from '@/lib/route/params';

import type { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export const POST = routeHandler(async (request: NextRequest): Promise<NextResponse> => {
  const { email, subject, body } = await getBody<SendArgs>(request);
  const { error } = await unbox(send({ email, subject, body }));
  return sendResponse({ error, errorCode: 400 });
});
