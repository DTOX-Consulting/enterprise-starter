import { socialGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/SocialGeneration';

const _Instagram = `
Choose between an Instagram Story or Carousel Post.
Create engaging visuals, incorporate relevant hashtags
and include a compelling caption with a clear call-to-action
`.trim();

export const Instagram = socialGenerationPrefixReplacer({
  length: '200',
  type: 'Instagram',
  lengthType: 'words',
  prompt: _Instagram
});
