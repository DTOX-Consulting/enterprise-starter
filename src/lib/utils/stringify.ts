import { configure, stringify as stableStringify } from 'safe-stable-stringify';

export const stringify = configure({ deterministic: false });

export const stringifyDeterministic = stableStringify;
