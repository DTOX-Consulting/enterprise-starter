import type { Result } from '@mobily/ts-belt';

export type APIResult<T = unknown, E extends APIError = APIError> = Promise<Result<T, E>>;

export type APIError = {
  code: number;
  status?: string;
  errors?: string[];
  message: string;
  request?: {
    url?: string;
    headers?: Record<string, unknown>;
  };
};

export type ErrorWithCode = Error & { code?: number };
