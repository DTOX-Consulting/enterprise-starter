import { R, type Result } from '@mobily/ts-belt';

import type { APIError } from '@/lib/route/types';

export const defaultErrorMapper = <E extends APIError>(_error: unknown): E => {
  const error = (_error as { error?: unknown }).error || _error;

  const status = (error as { status?: unknown }).status;
  const errors = (error as { errors?: unknown }).errors || [{ error }];
  const code =
    typeof (error as { code?: unknown }).code === 'number' ? (error as { code: number }).code : 500;
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

export const unboxR = <T, E extends APIError>(result: Result<T, E>): { data?: T; error?: E } => {
  return {
    data: R.toUndefined(result),
    error: R.toUndefined(R.flip(result))
  };
};

export const unboxPath = <
  T extends Record<string, unknown>,
  E extends APIError,
  R extends keyof T = 'result'
>(
  result: Result<T, E>,
  path: R = 'result' as R
): T[R] | undefined => {
  return unboxR(result)?.data?.[path];
};
