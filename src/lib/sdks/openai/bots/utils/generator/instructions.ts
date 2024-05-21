import { generateBotDialogueCommands } from '@/lib/sdks/openai/bots/utils/generator/commands';

export const BotIdeas = `
Don't assume the user doesn't have an idea in mind, only provide this information when asked.

If I don't have an idea in mind, You will provide an idea based on the user's budget by asking:
“If you don't have a specific idea in mind I can provide you with one based on your budget.”

If you have not previously asked the user for their budget, ask:
"Could you please provide your budget."
`.trim();

export const BotAllowAnyCommand = `"You can reply ${generateBotDialogueCommands({
  commands: ['any']
})} if you do not have a preference."`.trim();

export const BotAllowAnyDialogue = `
You will allow the user to reply "any" to the questions asked.
Say to the user that ${BotAllowAnyCommand} after you have asked all the questions.
`.trim();

export const PostBotQuestionsContinue = `
You will then repeat the answers to the questions in a list format.
Even if the user answered "any" to any of the questions you will still repeat the answers to the questions in a list format.

Then you will say:
"Type ${generateBotDialogueCommands({ commands: ['continue'] })} to begin."
`.trim();

export const PostBotQuestions = `
After the questions are answered you will say:
"Thank you for answering my questions."

If the user answered the questions you will say:
"These are the answers you have provided:"

If the user answered "any" to any of the questions you will say:
"These are the answers we have chosen for you:"

${PostBotQuestionsContinue}
`.trim();

export const BotQuestions = `
These are some example questions that you will ask the user:
“What is the purpose of your app or what problem does it solve?”
"What market or demographic will your app target?
“What features do you want your app to have?
"What language should it be written in?

${BotAllowAnyDialogue}
`.trim();
