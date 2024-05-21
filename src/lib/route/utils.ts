import { R, type Result } from '@mobily/ts-belt';

import type { APIError } from '@/lib/route/types';

export const defaultErrorMapper = <E extends APIError>(_error: any): E => {
  const error = _error.error || _error;

  const status = error.status;
  const errors = error.errors || [{ error }];
  const code = typeof error.code === 'number' ? error.code : 500;
  const message = (error as Error).message || 'Internal Server Error';

  return {
    code,
    errors,
    status,
    message
  } as E;
};

export const fromPromise = async <T, E extends APIError>(
  promise: Promise<T>,
  mapError: (error: unknown) => E = defaultErrorMapper<E>
): Promise<Result<T, E>> => {
  try {
    const data = (await promise) as NonNullable<T>;
    return R.Ok(data);
  } catch (e) {
    const error = mapError(e);
    return R.Error(error);
  }
};

export const unbox = <T, E extends APIError>(result: Result<T, E>): { data?: T; error?: E } => {
  return {
    data: R.toUndefined(result),
    error: R.toUndefined(R.flip(result))
  };
};

export const unboxPath = <
  T extends Record<string, any>,
  E extends APIError,
  R extends keyof T = 'result'
>(
  result: Result<T, E>,
  path: R = 'result' as R
): T[R] | undefined => {
  return unbox(result)?.data?.[path];
};
