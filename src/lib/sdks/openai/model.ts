import type { ChatModel } from 'openai/resources/index.mjs';

export const MODEL_TYPES = [
  'gpt-3.5-turbo',
  'gpt-4-turbo',
  'gpt-4o',
  'gpt-4o-mini',
  'o1',
  'o1-mini'
] as const satisfies readonly ChatModel[];

export type ModelType = (typeof MODEL_TYPES)[number];

export const DEFAULT_MODEL: ModelType = 'gpt-4o-mini';
