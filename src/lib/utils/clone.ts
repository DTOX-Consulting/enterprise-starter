import { G } from '@mobily/ts-belt';
import rfdc from 'rfdc';

import { parse, stringify } from '@/lib/utils/json';

const deepCloner = rfdc();

export const cloner = rfdc;

export const deepClone = <T>(obj: T) => deepCloner(obj);

export function clone<T>(obj: T): T {
  const stringified = stringify(obj);
  if (G.isNullable(stringified)) return {} as T;
  return parse<T>(stringified) ?? ({} as T);
}
