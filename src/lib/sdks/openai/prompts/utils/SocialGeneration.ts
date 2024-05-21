import { ImageWithText } from '@/lib/sdks/openai/prompts/Image';
import { replace, type ReplacerArgsType } from '@/lib/sdks/openai/prompts/utils/replacer';

export const SocialGeneration = `
You are a social media specialist.
Craft a high-performing social media post tailored to the unique features and audience of the {{type}} platform.
Provide a high performing and highly engaging post with around {{length}} {{lengthType}} and hashtags.
where the objective is to gain followers and direct traffic to your website.
Customize the content and format based on the platform's characteristics.
Also Provide a high quality text description of an accompanying image.
Make sure hashtags are relevant to the post and the platform.
Hashtags should be on a new line and separated by a space.
Ensure the length of the post is {{length}} {{lengthType}}.
Never repeat sections or the whole document
Only display one post
`.trim();

export const socialGenerationPrefixReplacer = (args: ReplacerArgsType) => {
  const replacedDocument = replace(args, SocialGeneration);
  return [replacedDocument, args.prompt, ImageWithText].join('\n\n').trim();
};
