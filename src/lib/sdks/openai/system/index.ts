import { type FormatType, Formats } from '@/lib/sdks/openai/system/Format';
import {
  Models,
  type ModelType,
  ImageModels,
  type ModelValueType,
  type ImageModelType,
  type ImageModelValueType
} from '@/lib/sdks/openai/system/Model';
import {
  Personas,
  type PersonaType,
  MinimalPersonas,
  type MinimalPersonaType
} from '@/lib/sdks/openai/system/Persona';
import { type SystemPromptType, SystemPrompts } from '@/lib/sdks/openai/system/System';
import {
  type MinimalToneType,
  MinimalTones,
  type ToneType,
  Tones
} from '@/lib/sdks/openai/system/Tone';

export type { ModelType, ModelValueType };
export type { ImageModelType, ImageModelValueType };
export type { MinimalPersonaType, MinimalToneType };
export type { ToneType, FormatType, PersonaType, SystemPromptType };

export const getTone = (tone: ToneType) => Tones[tone];
export const getModel = (model: ModelType) => Models[model];
export const getImageModel = (model: ImageModelType) => ImageModels[model];
export const getSystemPrompt = (prompt: SystemPromptType) => SystemPrompts[prompt];

export const getPersona = (persona: PersonaType) => {
  const personaDescription = Personas[persona];

  return `
This response is tailored for the following persona:
Target Persona: ${personaDescription}

Guidelines for Persona-Based Response:
1. Understand the needs, goals, and challenges of the target persona.
2. Ensure the content is relevant and valuable to the target persona.
3. Provide clear and actionable insights tailored to their specific context.
4. Deliver content that effectively addresses the persona's unique requirements and supports their objectives.
`.trim();
};

export const getFormat = (format: FormatType) => {
  const formatDescription = Formats[format];

  return `
This response should be structured in the following format:
Format: ${formatDescription}

Guidelines for Response Format:
1. Structure: Ensure the response follows the standard conventions of the specified format.
2. Clarity: The response should be clear, concise, and well-organized to facilitate understanding.
3. Consistency: Maintain consistency in style and presentation throughout the response.
4. Deliver a well-structured response that adheres to the specified format, enhancing readability and comprehension.
`.trim();
};

export const availableTones = Object.keys(Tones) as ToneType[];
export const availableFormats = Object.keys(Formats) as FormatType[];
export const availablePersonas = Object.keys(Personas) as PersonaType[];
export const availableSystemPrompts = Object.keys(SystemPrompts) as SystemPromptType[];

// Models
export const availableModels = Object.keys(Models) as ModelType[];
export const availableModlesValues = Object.values(Models) as ModelValueType[];

// Image Models
export const availableImageModels = Object.keys(ImageModels) as ImageModelType[];
export const availableImageModelsValues = Object.values(ImageModels) as ImageModelValueType[];

// Minimal for UI
export const availableMinimalTones = Object.keys(MinimalTones) as MinimalToneType[];
export const availableMinimalPersonas = Object.keys(MinimalPersonas) as MinimalPersonaType[];
