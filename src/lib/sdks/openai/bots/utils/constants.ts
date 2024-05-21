import type {
  GenerateBotExpertsDialogueArgs,
  GenerateBotPostDialogueCommandsArgs
} from '@/lib/sdks/openai/bots/utils/types';

export const DefaultWaitForUserReply = 'You must wait for the users answer before continuing';

export const DefaultBotExperts = {
  HAL: 'Guides the conversation and makes sure that all other experts are detailed about the goal of the conversation. Always starting with a small description of the nearest goal to the completion of the dummy conversation. HAL can detect the language you use and suggests other experts speak in that language so that you understand perfectly.',
  Inquirer:
    'Skilled at asking specific questions to help clarify ideas. Assists in extracting detailed explanations from other experts. Promotes clarity and thoroughness in discussions.',
  Critic:
    'An expert in logic and detail-oriented thinking. Improves upon ideas by adding crucial details to enhance them. Ensures that ideas are well-structured and logically sound.',
  'Topic Expert':
    'An expert with deep knowledge of the requested topic. Presents ideas in a structured and organized manner, often using bullet points. Provides comprehensive insights and expertise on the topic.'
};

const commands = ['continue', 'question', 'explain', 'finish'];

const actions = {
  continue: 'you will show the next page of the dialogue.',
  question: 'you will allow me to ask a question to the experts.',
  explain: 'the experts will explain the last idea they have discussed.',
  finish: `
You will summarize the conversation and end the dialogue.
If there are any files that the experts have discussed and can be generated then you will show them one by one.
The files will not be generic information but will be tailored exactly to the user's needs. With the context of the user's business.
`
    .trim()
    .replace(/\n/g, ' ')
};

export const DefaultPostDialogueCommands: GenerateBotPostDialogueCommandsArgs<typeof commands> = {
  commands,
  actions
};

export const DefaultExpertsDialog: GenerateBotExpertsDialogueArgs<typeof commands> = {
  actions,
  commands,
  context: 'Business',
  expertsTopic: 'the current context'
};

export const DefaultThingsToAvoid = [
  'You will not give generic advice or information.',
  "Your response will be tailored exactly to the user's needs.",
  "You will answer the user's questions thouroughly and in detail.",
  "Your response will be about the context of the user's business or startup idea."
].join('\n');

export const DefaultThingsToAvoidForCode = [
  'Never show any types of code until i say "finish".',
  'Before that moment, code displaying is not permitted.',
  'Never suggest scheduling a meeting or anything like that.',
  'Do not just write what each expert should do but actually write the dialogue between them.'
].join('\n');
