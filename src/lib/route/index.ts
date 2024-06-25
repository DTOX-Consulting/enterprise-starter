import { F, R, G, pipe } from '@mobily/ts-belt';
import { type NextRequest, NextResponse } from 'next/server';
import { serializeError } from 'serialize-error';
import { unbox } from 'unbox-js';

import { startLogger, finishLogger } from '@/lib/route/logger';

import type { APIResult, APIError, ErrorWithCode } from '@/lib/route/types';

export const sendResponse = ({
  data,
  error,
  errorCode = 500,
  successCode = 200
}: {
  error?: Error;
  errorCode?: number;
  successCode?: number;
  data?: Record<string, unknown>;
} = {}): NextResponse => {
  return error ? errorResponse(error, errorCode) : successResponse(data, successCode);
};

type Status = {
  code?: number;
  data?: Record<string, unknown>;
  error?: string | APIError | ErrorWithCode;
};

export const getStatus = ({ data, error, code }: Status) => {
  let successStatus = code ?? data?.code ?? 200;
  let errorStatus = code ?? (error as ErrorWithCode)?.code ?? 500;

  if (!G.isNumber(errorStatus)) errorStatus = 500;
  if (!G.isNumber(successStatus)) successStatus = 200;

  return {
    error: errorStatus,
    success: successStatus as number
  };
};

export const successResponse = (
  data: Record<string, unknown> = {},
  code?: number
): NextResponse => {
  const status = getStatus({ data, code }).success;
  return NextResponse.json({ success: true, ...data }, { status });
};

export const errorResponse = (
  err?: string | APIError | ErrorWithCode,
  code?: number
): NextResponse => {
  const status = getStatus({ error: err, code }).error;
  const error = serializeError(err ?? new Error('Unknown error'));
  return NextResponse.json({ success: false, error }, { status });
};

export const apiResponse = async <T, E extends APIError>(
  fn: APIResult<T, E>
): Promise<NextResponse> => {
  return pipe(
    await fn,
    R.map(successResponse),
    R.mapError(errorResponse),
    R.match<NextResponse, NextResponse, NextResponse>(F.identity, F.identity)
  );
};

export const routeHandler = <T extends Response>(fn: (request: NextRequest) => Promise<T>) => {
  return async (request: NextRequest) => {
    const { log, startTime } = await startLogger(request);
    const { data: response, error } = await unbox(fn(request));
    finishLogger<T>({ log, startTime, response, error });
    return response ? response : errorResponse(error);
  };
};
