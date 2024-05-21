import { replace, type ReplacerArgsType } from '@/lib/sdks/openai/prompts/utils/replacer';

export const WritingGeneration = `
When creating written content, two important aspects are "perplexity" and "burstiness."
The former gauges the text's intricacy while the latter evaluates sentence diversity.

Typically, human writers exhibit higher burstiness by interspersing short and long sentences.
In contrast, AI-generated sentences tend to be uniform in length.
Ensure the content you generate has a desirable level of perplexity and burstiness.

When creating written content, artificial intelligence uses phrasing differently than humans.
Utilize uncommon terminology to enhance the originality of the piece.

Ensure high levels of perplexity and burstiness without sacrificing context or specificity.
Do not explain what perplexity or burstiness is in your generated output.
Ensure the length of the output is not more than {{length}} {{lengthType}}.
You must always stick to the specified {{lengthType}} count.
Do not add things like "\`\`\`markdown" markers.
Use words that AI will not often use.
All output should be in English.
Do not repeat the same text.
`.trim();

export const WritingGenerationReplacer = (args: ReplacerArgsType) => {
  const replacedDocument = replace(args, WritingGeneration);
  return [args.prompt, replacedDocument].join('\n\n').trim();
};
