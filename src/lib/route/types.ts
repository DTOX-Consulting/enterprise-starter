import type { Result } from '@mobily/ts-belt';

export type APIResult<T = any, E extends APIError = APIError> = Promise<Result<T, E>>;

export type APIError = {
  code: number;
  status?: any;
  errors?: any[];
  message: string;
  request?: {
    url?: string;
    headers?: any;
  };
};

export type ErrorWithCode = Error & { code?: number };
