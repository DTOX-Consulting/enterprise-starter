export type GenericFunction<T = unknown, U extends unknown[] = unknown[]> = (
  ...args: U
) => T | Promise<T>;
