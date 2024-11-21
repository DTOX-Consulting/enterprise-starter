import { G } from '@mobily/ts-belt';
import { detailedDiff } from 'deep-object-diff';
import isEqual from 'react-fast-compare';
import { stringify } from 'safe-stable-stringify';

export type Diff<T> = {
  added: Partial<T>;
  deleted: Partial<T>;
  updated: Partial<T>;
};

export const isDeepEqual = (a: unknown, b: unknown): boolean => {
  if (G.isNullable(a) || G.isNullable(b)) {
    return false;
  }

  if (stringify(a) === stringify(b)) {
    return true;
  }

  return isEqual(a, b);
};

export const deepDiff = <T extends Record<string, unknown>>(a: T, b: T): Diff<T> =>
  detailedDiff(a, b);
