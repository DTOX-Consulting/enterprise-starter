import { DefaultBotExperts } from '@/lib/sdks/openai/bots/utils/constants';

import type { Experts } from '@/lib/sdks/openai/bots/utils/types';

const convertBotExpertsToPrompt = (experts: Experts) =>
  Object.entries(experts)
    .map(([title, description]) => `**${title}** - ${description}`)
    .join('\n\n');

export const expertsPrompt = (experts?: Experts) =>
  `
  Default Experts:
  ${convertBotExpertsToPrompt(DefaultBotExperts)}

  User Provided Experts:
  ${experts ? convertBotExpertsToPrompt(experts) : 'None Provided'}
`.trim();

export const expertsInstruction = (context: string) =>
  `
If the user doesn't provide any experts
Then based around the context: ${context}
You will generate 3 experts that are best suited to tackle the context and say:
"I have found 3 additional experts that are best suited to help with your problem."

You will list all experts in a list format:
**<expert title>** - <expert description>

You must only use the experts listed and no others.
`.trim();
