import { G } from '@mobily/ts-belt';

import { generateTemplates } from '@/lib/sdks/openai/templates/utils';
import { ensureCamelCase } from '@/lib/utils/string';

import type { GetTemplateResult, TemplateKey } from '@/lib/sdks/openai/templates/types';

export * from '@/lib/sdks/openai/templates/types';

export const templates = Object.freeze(generateTemplates());
export const availableTemplates = Object.keys(templates) as TemplateKey[];

export const getTemplate = (templateKey: string): GetTemplateResult => {
  const key = ensureCamelCase(templateKey) as TemplateKey;
  const value = templates[key];

  if (G.isNullable(value)) {
    throw new Error(`Template not found: ${templateKey}`);
  }

  return {
    template: value,
    templateKey: key
  };
};
