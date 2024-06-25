import { type Exists, keysExist } from '@/lib/utils/object';

export function throwError<T, K extends (keyof T)[]>(
  message: string,
  data?: T | undefined,
  keys?: K
): asserts data is Exists<T, K> {
  if (!keysExist(data, keys)) {
    throw new Error(message);
  }
}
