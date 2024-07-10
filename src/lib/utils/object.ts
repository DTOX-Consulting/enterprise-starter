import { G } from '@mobily/ts-belt';

import { throwError } from '@/lib/utils/error';

import type { GenericFunction } from '@/lib/utils/function';
// import type { DeepReadonlyArray, DeepReadonlyObject } from 'rxdb';

// export type { DeepReadonly, DeepReadonlyArray, DeepReadonlyObject } from 'rxdb';

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type MaybeReadonly<T> = T | Readonly<T>;

export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends GenericFunction
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

export type KeyList<T> = (keyof T)[];

export type NonNullableRequiredKeys<T, K extends KeyList<T>> = {
  [Key in K[number]]: NonNullable<T[Key]>;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericObject<K extends string = string, T = any> = Record<K, T>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type DeepGenericObject<K extends string = string, T = any> = DeepReadonly<
  GenericObject<K, T>
>;

export type Exists<T, K extends KeyList<T>> = NonNullable<T> & NonNullableRequiredKeys<T, K>;

export function keysExist<T, K extends (keyof T)[]>(
  data?: T | undefined,
  keys?: K
): data is Exists<T, K> {
  const hasData = G.isNotNullable(data);
  const hasKeys = G.isNotNullable(keys);

  if (!hasData) {
    return false;
  }

  if (!hasKeys) {
    return true;
  }

  return !!keys.every((key) => Reflect.has(data, key));
}

export function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]] as [T, T];
  }

  return arr;
}

export function replaceWholeArray<T>(arr: T[], replacement: T[]) {
  Object.assign(arr, replacement, { length: replacement.length });
}

export function chunk<T>(arr: T[], totalLength: number): T[][] {
  const chunkSize = Math.ceil(arr.length / totalLength);

  return Array.from({ length: totalLength }, (_, i) => {
    const start = i * chunkSize;
    const end = Math.min((i + 1) * chunkSize, arr.length);
    return arr.slice(start, end);
  }).filter((subarray) => subarray.length > 0);
}

/**
 * Lets you filter the fields of a given object.
 * Includes fields when the predicate revaluate to true
 * and drops them when it evaluates to false
 *
 * @returns Object with fields filtered
 */
export function filterProperties<T extends GenericObject>(
  obj: T,
  predicate: (value: unknown, key: keyof T) => boolean
): T {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (predicate(value, key as keyof T)) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as T);
}

export type NonNullableObjectWithFields<
  T extends object,
  K extends keyof T = keyof T
> = NonNullable<T> & NonNullableObject<T, K>;

/**
 * Allows to check if object keys are nullable and makes sure that the correct type is used.
 * if no explicit fields are passed, we check all fields via Object.keys
 *
 * @returns void
 */
export function assertNonNullableFields<T extends object, K extends keyof T = keyof T>(
  obj: T | null = {} as T,
  ...fields: ReadonlyArray<K>
): asserts obj is NonNullableObjectWithFields<T, K> {
  assertNonNullish(obj, 'Expected object to be defined');

  const fieldsToCheck = fields.length === 0 ? (Object.keys(obj) as Array<keyof T>) : fields;

  for (const field of fieldsToCheck) {
    const fieldValue = obj[field] as T[K];
    assertNonNullish(fieldValue, `Expected "${field.toString()}" to be defined`, {
      obj
    });
  }
}

export type NonNullableObject<T extends object, K extends keyof T = keyof T> = T & {
  [P in K]-?: Exclude<T[P], undefined | null>;
};

/**
 * Get a new object with only the specified keys
 *
 * @param obj
 * @param keys
 */
export function pick<T extends GenericObject>(obj: T, ...keys: ReadonlyArray<keyof T>) {
  return filterProperties<T>(obj, (_, key) => keys.includes(key));
}

/**
 * Get a new object without the specified keys
 *
 * @param obj
 * @param keys
 */
export function omit<T extends GenericObject>(obj: T, ...keys: ReadonlyArray<keyof T>) {
  return filterProperties<T>(obj, (_, key) => !keys.includes(key));
}

/**
 * Assert value is not nullish
 *
 * @param value
 * @param message
 * @param context
 */
export function assertNonNullish<T>(
  value: T,
  message?: string,
  context?: Readonly<Record<string, unknown>>
): asserts value is NonNullable<T> {
  if (G.isNullable(value)) {
    throwError(message ?? 'The value is empty', context);
  }
}

/**
 * Assert on provided boolean condition with standardised error message
 *
 * @param condition
 * @param message
 * @param context
 */
export function assertCondition(
  condition: unknown,
  message?: string,
  context?: Readonly<Record<string, unknown>>
): asserts condition {
  if (!condition) {
    throwError(message ?? 'The condition evaluated to false', context);
  }
}

/**
 * note: no deep mapping
 */
export function mapValues<T, R>(
  obj: Readonly<Record<string, T>>,
  mapper: (value: Readonly<T>) => R
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]: Readonly<[string, Readonly<T>]>) => [key, mapper(value)])
  );
}

/**
 * Get a new object where keys with previously undefined values are removed
 *
 * @param obj
 */
export function removeUndefinedFromObject<T extends GenericObject>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]: Readonly<[string, unknown]>) => value !== undefined)
  ) as T;
}

/**
 * Check if object is empty
 *
 * @param obj
 * @returns true if object is empty
 */
export function isEmptyObject(obj: Readonly<Record<string, unknown>>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
