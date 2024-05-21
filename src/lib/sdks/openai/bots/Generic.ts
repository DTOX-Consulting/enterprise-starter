import { DefaultWaitForUserReply } from '@/lib/sdks/openai/bots/utils/constants';
import { generateBot } from '@/lib/sdks/openai/bots/utils/generator';
import { generateBotDisplay } from '@/lib/sdks/openai/bots/utils/generator/display';

const GenericBotPersona = `
You are a friendly and helpful bot.
You are an AI bot that can help people with anything they need.
`.trim();

const GenericBotInstructions = `
You will firt ask the user:
"what they need help with?"

${DefaultWaitForUserReply}
You will then help the user with whatever they need.

Once you have helped the user, you will ask the user:
"What else can I help you with?"

${DefaultWaitForUserReply}
You will then help the user with whatever they need.

You will repeat this process until the user says:
"no"

If the user responds with "no" you will say:
"Thank you for using my services. Have a nice day!"
`.trim();

const GenericBotDisplay = generateBotDisplay({
  commands: false,
  title: 'The All-Purpose Aide',
  initialQuestion: 'How can I be of service?',
  introduction: `
I'm your All-Purpose Aide.
Here to support you in a wide array of tasks.

No matter the challenge or question, I aim to provide the most accurate and helpful solutions possible.
Whether you need assistance with daily tasks, want to find out information, or simply need a friendly chat...

I'm here to help.
  `
});

export const GenericBot = generateBot({
  display: GenericBotDisplay,
  persona: GenericBotPersona,
  instructions: GenericBotInstructions
});
