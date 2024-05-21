import {
  DefaultWaitForUserReply,
  DefaultPostDialogueCommands
} from '@/lib/sdks/openai/bots/utils/constants';
import {
  generateBotActions,
  generateBotCommands
} from '@/lib/sdks/openai/bots/utils/generator/commands/helpers';
import { AI_NAME } from '@/lib/sdks/openai/constants';

import type {
  GenerateBotPostDisplayCommandArgs,
  GenerateBotPostDialogueCommandsArgs
} from '@/lib/sdks/openai/bots/utils/types';

export const generateBotDialogueCommands = ({
  actions,
  commands,
  addQuotes,
  commandsMessage
}: GenerateBotPostDisplayCommandArgs) => {
  const contentArray = [];

  commandsMessage && contentArray.push(commandsMessage);
  commands && contentArray.push(generateBotCommands(commands));

  const message = contentArray.join('\n\n').trim();
  const quotedMessage = addQuotes ? `"${message}"` : message;

  const finalArray = [quotedMessage];
  actions && finalArray.push(generateBotActions(actions));
  commandsMessage && finalArray.push(DefaultWaitForUserReply);

  return finalArray.join('\n\n').trim();
};

export const generateBotPostDialogueCommands = ({
  actions,
  commands
}: GenerateBotPostDialogueCommandsArgs = DefaultPostDialogueCommands): string =>
  `
After the dialogue between the experts, you will then show:
"**Next Steps:**" which is a pointed list of the next ideas of the experts.

${generateBotDialogueCommands({
  addQuotes: true,
  actions: actions,
  commands: commands,
  commandsMessage: 'What would you like to do next?'
})}
`.trim();

export const generateBotFinishDialogueCommands = (moreToGenerate?: string) =>
  `
-------------------------------------------------------------
If I say "finish", you will first summarize the conversation.

You will then show:
A list of every idea discussed by the experts during the conversation.

"${AI_NAME}" will start to show the files that the experts have discussed.

If there are no files to be shown, you will say:
"#### Thank you for your time. I hope this has been helpful."
and you will end the conversation.

You will first ask the user:
${generateBotDialogueCommands({
  addQuotes: true,
  commands: ['yes', 'no'],
  commandsMessage: 'Are you ready for the files to be generated?'
})}

From now on, each output must contain only one file at a time.

From now on at the end of all the prompts of "${AI_NAME}" you must write:
"Type ${generateBotDialogueCommands({ commands: ['continue'] })} to generate the next file."
This way you'll be able to show one file at a time for each output.

You will generate the file in the format:
<file name>
<file content in the right format>

${moreToGenerate || ''}

When all files are shown:
You will display the proposed folder structure from the list of files that the experts have discussed.

After we are finished if, you will show the final message:
"### Congratulations 🎉🎉"
"You now have all the files you need to start your journey"
`.trim();

export const generateBotContinueDialogueCommand = (command = 'continue') =>
  `
You will then ask the user:
"Type ${generateBotDialogueCommands({ commands: ['continue'] })} to ${command}."
`.trim();
