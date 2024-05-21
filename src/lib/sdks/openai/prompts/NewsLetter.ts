import { socialGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/SocialGeneration';

const _NewsLetter = `
As a content creator for our monthly newsletter,
I need your help in designing a professionally formatted newsletter template for a company in any industry.
The newsletter should have a visually appealing, stylish, and engaging layout suitable for digital distribution.
Can you assist me in creating this template?

The newsletter should be professionally designed and feature sections
for showcasing recent projects or work the company has done,
highlighting blog posts or articles, and sharing general news and updates from the company.
Please include placeholders for headlines, article summaries, images, and contact information.
`.trim();

export const NewsLetter = socialGenerationPrefixReplacer({
  length: '2000',
  type: 'NewsLetter',
  lengthType: 'words',
  prompt: _NewsLetter
});
