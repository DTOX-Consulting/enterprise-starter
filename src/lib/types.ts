import type { Message } from 'ai';

export type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
  messages: Message[];
  sharePath?: string;
} & Record<string, unknown>;

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export type EnsureAllKeysHaveValues<T extends readonly string[]> = {
  [K in T[number]]: string;
};

export type NN<T> = { [P in keyof T]-?: NN<NonNullable<T[P]>> };

export type ValueOf<T> = T[keyof T];

export type TypeFromVar<T> = ValueOf<T>[];

export type PartialWithKeys<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type PartialWithoutKeys<T, K extends keyof T> = Partial<Omit<T, K>>;

export type Tuple<T extends string> = [T, ...T[]];
