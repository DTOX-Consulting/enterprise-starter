import { availableDocuments } from '@/lib/sdks/openai';
import { templateOverrides } from '@/lib/sdks/openai/templates/overrides';
import { camelCaseToTitleCase } from '@/lib/string';

import type { Template, TemplateMap } from '@/lib/sdks/openai/templates/types';

const defaultTemplate: Template = {
  model: 'gpt4',
  format: 'plain',
  name: 'Document',
  persona: 'investor',
  tone: 'professional',
  fileName: 'Document.pdf',
  prompt: 'businessConsultant',
  body: `
    We are thrilled to present you with your Document.
    Please review it by clicking the button below.
  `
};

export const generateTemplates = (): TemplateMap =>
  availableDocuments.reduce((acc, prompt) => {
    const templateOverride = templateOverrides[prompt] ?? {};
    const name = camelCaseToTitleCase(prompt);
    const fileName = `${name}.pdf`;

    const defaultOverride = {
      name,
      prompt,
      fileName
    };

    acc[prompt] = {
      ...defaultTemplate,
      ...defaultOverride,
      ...templateOverride
    };

    return acc;
  }, {} as TemplateMap);
