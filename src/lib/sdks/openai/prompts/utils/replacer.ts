import { dashCaseToTitleCase } from '@/lib/string';

export type LengthType = 'characters' | 'words' | 'sentences' | 'paragraphs';

export type ReplacerArgsType = {
  type: string;
  prompt: string;
  length?: string | number;
  lengthType?: LengthType;
};

export const replace = (
  { type, prompt, length, lengthType }: ReplacerArgsType,
  toReplace: string
) => {
  const name = type.toLowerCase();
  const title = dashCaseToTitleCase(type);

  const replacers = {
    type,
    name,
    title,
    prompt,
    length,
    lengthType
  } as const;

  const replacerKeys = Object.keys(replacers) as (keyof typeof replacers)[];

  return replacerKeys.reduce((acc, key) => {
    const regex = new RegExp(`{{${key}}}`, 'gmi');
    return acc.replace(regex, `${replacers[key]}`);
  }, toReplace);
};
