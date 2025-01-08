import jsonParse from 'parse-json';
import { configure, stringify as stableStringify } from 'safe-stable-stringify';

export const stringify = configure({ deterministic: false });

export const stringifyDeterministic = stableStringify;

export const parseDeterministic = jsonParse;

export const parse = <T>(str: string): T | null => {
  try {
    return jsonParse(str) as T;
  } catch {
    return null;
  }
};
