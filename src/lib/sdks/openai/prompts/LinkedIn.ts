import { socialGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/SocialGeneration';

const _LinkedIn = `
Decide between a LinkedIn Post or an in-depth LinkedIn Article.
Establish thought leadership, gain connections, and direct traffic to your website.
Utilize industry-specific hashtags, mentions, and valuable insights.
`.trim();

export const LinkedIn = socialGenerationPrefixReplacer({
  length: '500',
  type: 'LinkedIn',
  lengthType: 'words',
  prompt: _LinkedIn
});
