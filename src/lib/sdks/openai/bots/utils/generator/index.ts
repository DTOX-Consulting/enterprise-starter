import type { GenerateBotArgs } from '@/lib/sdks/openai/bots/utils/types';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export const generateBot =
  (args: GenerateBotArgs) =>
  (messages: ChatCompletionRequestMessage[], retrieve?: keyof GenerateBotArgs) =>
    retrieve
      ? args[retrieve]
      : messages.at(-1)?.content?.includes('Bot:')
        ? args.display
        : [args.persona, args.instructions].join('\n\n');
