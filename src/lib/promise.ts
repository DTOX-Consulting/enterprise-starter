import { G } from '@mobily/ts-belt';
import { timeout } from 'already';
import { unbox } from 'unbox-js';

import { logger } from '@/lib/logger';

import type { GenericObject } from '@/lib/object';

export const retryWithTimeout = async <T>(
  fn: () => Promise<T>,
  timeoutMs = 30000,
  retries = 3
): Promise<T> => {
  const { timedout, reflection } = await timeout(fn(), timeoutMs);

  if (timedout && retries > 0) {
    logger.warn({ retries, timeoutMs }, 'Retrying after timeout');
    return retryWithTimeout(fn, timeoutMs, retries - 1);
  }

  if (timedout || !reflection?.isResolved) {
    throw new Error('Timeout while executing function');
  }

  return reflection.value;
};

export function createUrl(
  url: string,
  params?: GenericObject<string, string | string[] | undefined>
) {
  if (!params) {
    return url;
  }

  const urlWithParams = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    G.isNotNullable(value) &&
      value !== 'undefined' &&
      urlWithParams.searchParams.append(key, G.isArray(value) ? value.join(',') : value);
  });

  return urlWithParams.toString();
}

export function danglingPromise<T>(promise: Promise<T>): void {
  // Capture stack traces so that we can later append them to the error
  let originalStack = new Error().stack as unknown as string;
  originalStack = originalStack.slice(originalStack.indexOf('\n') + 1);

  void wrapper();

  /**
   * Wrap promise to capture error
   */
  async function wrapper() {
    const { error } = await unbox(promise);

    if (error) {
      error.stack = `${error.stack ?? `Error: ${error.message}`}\n${originalStack}`;
      console.error(error);
    }
  }
}
