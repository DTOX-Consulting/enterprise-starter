import type { ToneType, ModelType, FormatType, PersonaType, DocumentType } from '@/lib/sdks/openai';

export type Template = {
  name: string;
  body: string;
  fileName: string;
  tone: ToneType;
  model: ModelType;
  format: FormatType;
  prompt: DocumentType;
  persona: PersonaType;
};

export type TemplateKey = DocumentType;
export type TemplateMap = Record<TemplateKey, Template>;
export type TemplateOverrides = Partial<Record<TemplateKey, Partial<Template>>>;

export type GetTemplateResult = {
  template: Template;
  templateKey: TemplateKey;
};
