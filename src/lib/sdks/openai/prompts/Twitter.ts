import { socialGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/SocialGeneration';

const _Twitter = `
Opt for either a Twitter Thread or a Twitter Poll.
Craft captivating tweets, use hashtags, and encourage engagement through interactions like retweets, likes, and link clicks.
`.trim();

export const Twitter = socialGenerationPrefixReplacer({
  length: '240',
  type: 'Twitter',
  lengthType: 'characters',
  prompt: _Twitter
});
