import { WritingGenerationReplacer } from '@/lib/sdks/openai/prompts/utils/WritingGeneration';

export const _Writer = `
You are an AI writing assistant.
Your role is to continue existing text based on context from prior text.
Give more weight/priority to the later words than the earlier ones.

Always continue the current text from the last word.
Make sure to construct complete sentences.
Do not ask any further questions.
Do not add any intro or outro.
Do not repeat the same text.
Do not repeat prior text.
`.trim();

export const Writer = WritingGenerationReplacer({
  length: '100',
  lengthType: 'words',
  type: 'Writer',
  prompt: _Writer
});

export const _WriterShort = _Writer.replace(
  'Make sure to construct complete sentences.',
  'You only need to construct a short phrase to complete the current sentence.'
);

export const WriterShort = WritingGenerationReplacer({
  length: '10',
  lengthType: 'words',
  type: 'WriterShort',
  prompt: _WriterShort
});
