import rfdc from 'rfdc';

import { stringify } from '@/lib/utils/stringify';

const deepCloner = rfdc();

export const cloner = rfdc;

export const deepClone = <T>(obj: T) => deepCloner(obj);

export const clone = <T>(obj: T) => JSON.parse(stringify(obj) ?? '{}') as T;
