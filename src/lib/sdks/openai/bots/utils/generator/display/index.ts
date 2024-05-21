import { generateBotDialogueCommands } from '@/lib/sdks/openai/bots/utils/generator/commands';
import {
  botDisplayIdentity,
  botDisplayIntroduction,
  botDisplayInstructions
} from '@/lib/sdks/openai/bots/utils/generator/display/helpers';

import type { GenerateBotDisplayArgs } from '@/lib/sdks/openai/bots/utils/types';

export const generateBotDisplay = ({
  title,
  botImagePath,
  introduction,
  initialQuestion,
  commands = ['yes', 'no']
}: GenerateBotDisplayArgs) =>
  `
${botDisplayInstructions()}

${botDisplayIdentity(title, botImagePath)}

You must create a new line with “—-“ to separate these sections.

${botDisplayIntroduction(introduction, initialQuestion)}

Always add the below commands on a new line.

${generateBotDialogueCommands({
  addQuotes: true,
  commands: commands
})}
`.trim();
