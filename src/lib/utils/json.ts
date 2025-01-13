import { G } from '@mobily/ts-belt';
import jsonParse from 'parse-json';
import { configure, stringify as stableStringify } from 'safe-stable-stringify';

export const stringify = configure({ deterministic: false });

export const stringifyDeterministic = stableStringify;

export const parseDeterministic = jsonParse;

type JsonOptions<T> = {
  throwError?: boolean;
  validator?: (value: T) => {
    isValid: boolean;
    error: Error | null;
  };
};

export const parse = <T>(str: string, jsonOptions?: JsonOptions<T>): T | null => {
  const validator = jsonOptions?.validator ?? (() => ({ isValid: true, error: null }));

  try {
    const obj = jsonParse(str) as T;
    const { isValid, error } = validator(obj);

    if (!isValid) {
      throw error;
    }

    return obj;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);

    if (G.isNotNullable(jsonOptions?.throwError)) {
      throw error;
    }

    return null;
  }
};
