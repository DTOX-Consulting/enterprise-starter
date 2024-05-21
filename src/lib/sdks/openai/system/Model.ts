type ValueOf<T> = T[keyof T];

export type ModelType = keyof typeof Models;
export type ModelValueType = ValueOf<typeof Models>;

export const Models = {
  gpt4: 'gpt-4o', // 128K tokens
  gpt3: 'gpt-3.5-turbo' // 16K tokens
} as const;

export type ImageModelType = keyof typeof ImageModels;
export type ImageModelValueType = ValueOf<typeof ImageModels>;

export const ImageModels = {
  dalle_2: 'dall-e-2',
  dalle_3: 'dall-e-3'
} as const;
