export const OPENAI_MODELS = [
  'gpt-3.5-turbo',
  'gpt-4-turbo',
  'gpt-4o',
  'gpt-4o-mini',
  'o1',
  'o1-mini'
] as const;

export const ANTHROPIC_MODELS = ['claude-2', 'claude-instant-1'] as const;

export const MISTRAL_MODELS = ['mistral-tiny', 'mistral-small', 'mistral-medium'] as const;

export const GEMINI_MODELS = ['gemini-pro', 'gemini-pro-vision'] as const;

export type OpenAIModel = (typeof OPENAI_MODELS)[number];
export type AnthropicModel = (typeof ANTHROPIC_MODELS)[number];
export type MistralModel = (typeof MISTRAL_MODELS)[number];
export type GeminiModel = (typeof GEMINI_MODELS)[number];

export type ModelType = OpenAIModel | AnthropicModel | MistralModel | GeminiModel;
export type Provider = 'openai' | 'anthropic' | 'mistral' | 'gemini';

export type AIModelCredentials = {
  apiKey: string;
  organization?: string;
};

export const MODEL_TYPES = [
  ...OPENAI_MODELS,
  ...ANTHROPIC_MODELS,
  ...MISTRAL_MODELS,
  ...GEMINI_MODELS
] as const;

export const DEFAULT_MODEL: ModelType = 'gpt-4o-mini';
