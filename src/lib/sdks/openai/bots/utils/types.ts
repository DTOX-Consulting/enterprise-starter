import type { EnsureAllKeysHaveValues } from '@/lib/types';

export type Experts = Record<string, string>;

export type GenerateBotArgs = {
  display: string;
  persona: string;
  instructions: string;
};

export type GenerateBotDisplayArgs = {
  title: string;
  introduction: string;
  botImagePath?: string;
  initialQuestion: string;
  commands?: string[] | false;
};

export type GenerateBotPostDisplayCommandArgs = {
  addQuotes?: boolean;
  commandsMessage?: string;
  commands: string[] | false;
  actions?: Record<string, string>;
};

export type GenerateBotPostDialogueCommandsArgs<T extends string[] = string[]> = {
  commands: T;
  actions: Record<keyof EnsureAllKeysHaveValues<T>, string>;
};

export type GenerateBotExpertsDialogueArgs<T extends string[] = string[]> = Omit<
  GenerateBotPostDialogueCommandsArgs<T>,
  'commands' | 'actions'
> & {
  context: string;
  experts?: Experts;
  expertsTopic?: string;
  moreToGenerate?: string;
  actions?: GenerateBotPostDialogueCommandsArgs<T>['actions'];
  commands?: GenerateBotPostDialogueCommandsArgs<T>['commands'];
};
