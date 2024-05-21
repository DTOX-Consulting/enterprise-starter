import { getModel, getBotMeta, getBot } from '@/lib/sdks/openai';
import { createCompletion } from '@/lib/sdks/openai/api';

import type { BotType } from '@/lib/sdks/openai';
import type { ChatCompletionRequestMessage } from 'openai-edge';

export const findBot = async (
  prompt: BotType,
  message: string,
  previousMessage: string
): Promise<BotType> => {
  const botMeta = getBotMeta(prompt);
  const bots = botMeta.bots?.filter((bot) => bot !== prompt) ?? [];

  try {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: 'system',
        content: `
          You are a Bot Finder.
          You are given a message and a list of bots.
          You must find the best bot to respond to the message.
          The best bot is the one that responds with the most relevant message.

          The previous message is:
          ${previousMessage}

          The current message is:
          ${message}

          If the current message is a continuation of a conversation from the previous message, return the bot that was used in the previous message.

          Do not return anything other than the bot name in the response.
          The bot must be one of the bots in the list.
          If no bot is found, return "${prompt}"
        `.trim()
      },
      {
        role: 'user',
        content: `
          What is the best bot to reply to the message:
          ${message}

          The previous message was:
          ${previousMessage}

          The options are:
          ${generateBotsPrompt(bots)}

          Do not return anything other than the bot name in the response.
        `.trim()
      }
    ];

    const content = await createCompletion(messages, {
      model: getModel('gpt3'),
      prompt: 'none',
      isBot: false
    });

    console.info('>>>>> Chosen Bot:', content);
    return (content as BotType) ?? prompt;
  } catch (error) {
    console.error(error);
  }

  return prompt;
};

// get bot description from meta
const generateBotsPrompt = (bots: BotType[]) =>
  bots
    .map((bot) => {
      const meta = getBotMeta(bot);
      return `
        \t${bot}:
        ${getBot(bot)([], 'persona')
          .split('\n')
          .filter((line) => line.trim())
          .map((line) => `\t\t* ${line}`)
          .join('\n')}
      `.trim();
    })
    .join('\n');
