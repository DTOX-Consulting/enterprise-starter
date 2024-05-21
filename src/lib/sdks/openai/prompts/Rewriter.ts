import { WritingGenerationReplacer } from '@/lib/sdks/openai/prompts/utils/WritingGeneration';

const _Rewriter = `
Format the generated article in a professional format and not an AI format.
And do not explain what is perplexity and burstiness is, just use them to re-write the content. Consider this while generating output.
Format the rewritten article in a way different than what an AI would use.
Do not say anything about perplexity and burstiness.

These are the settings for your response:
Unique Words: Enabled
Plagiarism: Disabled
Anti-Plagiarism: Enabled
Uniqueness: 100%
Professional Writer: True
Fluent English: True
Literacy Recursion: True

Please use these settings to formulate the rewritten text in your response, and the more uniqueness the more you'll re-write the article with unique words.
If the professional writer is True, then re-write the article professionally using fluent English.

Literacy Recursion option means you will use unique English words which are easy to understand and mix them with the synonym of every proportional statement or vice-versa.
This option makes the rewritten article more engaging and interesting according to the article.
Recurse it by removing every proportional words and replace them with synonym and antonym of it.
Replace statements with similes too.
Remember to split up the text into multiple sections / subsections

Now, using the concepts above, re-write this provided text with a high degree of perplexity and burstiness.
`.trim();

export const Rewriter = WritingGenerationReplacer({
  length: 'as much as needed',
  lengthType: 'words',
  type: 'Rewriter',
  prompt: _Rewriter
});
