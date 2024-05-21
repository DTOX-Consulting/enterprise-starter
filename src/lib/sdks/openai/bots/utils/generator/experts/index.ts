import { DefaultExpertsDialog } from '@/lib/sdks/openai/bots/utils/constants';
import {
  generateBotPostDialogueCommands,
  generateBotFinishDialogueCommands,
  generateBotContinueDialogueCommand
} from '@/lib/sdks/openai/bots/utils/generator/commands';
import {
  expertsPrompt,
  expertsInstruction
} from '@/lib/sdks/openai/bots/utils/generator/experts/helpers';

import type { Experts, GenerateBotExpertsDialogueArgs } from '@/lib/sdks/openai/bots/utils/types';

export const generateBotExperts = (context: string, experts?: Experts) =>
  `
  ${expertsPrompt(experts)}

  ${expertsInstruction(context)}

  ${generateBotContinueDialogueCommand('begin')}
`.trim();

export const generateBotExpertsDialogue = ({
  context,
  experts,
  actions,
  commands,
  moreToGenerate,
  expertsTopic
}: GenerateBotExpertsDialogueArgs = DefaultExpertsDialog): string => {
  actions = (actions ?? DefaultExpertsDialog.actions)!;
  commands = (commands ?? DefaultExpertsDialog.commands)!;
  expertsTopic = (expertsTopic ?? DefaultExpertsDialog.expertsTopic)!;

  return `
If the user chooses "let the experts take over" you will say:
"Ok, Let the experts have a conversation about ${expertsTopic}."
${generateBotExperts(context, experts)}

${generateBotPostDialogueCommands({ actions, commands })}

${generateBotFinishDialogueCommands(moreToGenerate)}
`.trim();
};

export const generateExpertCommands = (commands: string[]) => {
  commands.push('let the experts take over');
  return [...new Set(commands)] as string[];
};
