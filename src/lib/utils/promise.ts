import { G } from '@mobily/ts-belt';
import { timeout } from 'already';
import { unbox } from 'unbox-js';

import { logger } from '@/lib/logger/console';

import type { GenericObject } from '@/lib/utils/object';

export function createUrl(
  url: string,
  params?: GenericObject<string, string | string[] | undefined>
) {
  if (!params) {
    return url;
  }

  const urlWithParams = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (G.isNotNullable(value) && value !== 'undefined') {
      const paramValue = G.isArray(value) ? value.join(',') : value;
      urlWithParams.searchParams.append(key, paramValue);
    }
  });

  return urlWithParams.toString();
}

export function danglingPromise<T>(promise: Promise<T> | (() => Promise<T>)): void {
  // Capture stack traces so that we can later append them to the error
  let originalStack = new Error().stack as unknown as string;
  originalStack = originalStack.slice(originalStack.indexOf('\n') + 1);

  void wrapper();

  /**
   * Wrap promise to capture error
   */
  async function wrapper() {
    const { error } = await unbox(G.isFunction(promise) ? promise() : promise);

    if (error) {
      const errorMessage =
        error.stack != null && error.stack !== '' ? error.stack : `Error: ${error.message}`;

      error.stack = `${errorMessage}\n${originalStack}`;
      console.error(error);
    }
  }
}

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = (await res.json()) as {
      error: string;
    };
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    }

    throw new Error('An unexpected error occurred');
  }

  return res.json() as Promise<JSON>;
}

export async function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function retry<T>(times: number, fn: () => Promise<T>): Promise<T> {
  let error: Error | undefined;

  for (let index = 0; index < times; index++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await fn();
    } catch (err) {
      error = err as Error;
    }
  }

  throw error ?? new Error('Failed after retrying');
}

export const retryWithTimeout = async <T>(
  fn: () => Promise<T>,
  timeoutMs = 30000,
  retries = 3
): Promise<T> => {
  const { timedout, reflection } = await timeout(fn(), timeoutMs);

  if (timedout && retries > 0) {
    logger.warn('Retrying after timeout', { retries, timeoutMs });
    return retryWithTimeout(fn, timeoutMs, retries - 1);
  }

  if (timedout || !reflection.isResolved) {
    throw new Error('Timeout while executing function');
  }

  return reflection.value;
};

export function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
} {
  let resolve: ((value: T) => void) | undefined;
  let reject: ((error: Error) => void) | undefined;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  if (!resolve || !reject) {
    throw new Error('Promise not initialized.');
  }

  return { promise, resolve, reject };
}

export async function props<T extends Record<string, Promise<unknown>>>(
  obj: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  const entries = await Promise.all(
    Object.entries(obj).map(async ([key, value]) => [key, await value])
  );

  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> };
}

export async function each<T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
  for (let index = 0; index < arr.length; index++) {
    const item = arr[index] as T;
    // eslint-disable-next-line no-await-in-loop
    await fn(item, index, arr);
  }
}

export async function map<T, U>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(arr.map(async (item, index) => fn(item, index, arr)));
}
