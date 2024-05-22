import { type BotType, availableBots } from '@/lib/sdks/openai/bots';
import { type ModelType, getModel } from '@/lib/sdks/openai/system';
import { camelCaseToTitleCase } from '@/lib/utils/string';

export type TierType = 'free' | 'startup' | 'pro' | 'enterprise' | 'superuser';

export type BotMetadata = {
  tier: TierType;
  model: ModelType;
  description?: string;
  bots?: BotType[];
};

export type BotUIType = {
  name: string;
  value: BotType;
};

const defaultMeta: BotMetadata = {
  tier: 'superuser',
  model: 'gpt3'
};

const BotMeta = {
  learn: {
    tier: 'free',
    model: 'gpt3',
    description: 'Learn about any topic with a short summary.'
  },
  allPurpose: {
    tier: 'free',
    model: 'gpt3',
    description: 'A general purpose bot that can do a little bit of everything.'
  },
  decision: {
    tier: 'free',
    model: 'gpt3',
    description: 'Make a decision by asking a question.'
  },
  fundingGuide: {
    tier: 'startup',
    model: 'gpt3',
    description: 'Get a guide to funding your startup.'
  },
  socialMedia: {
    tier: 'startup',
    model: 'gpt3',
    description: 'Generate social media posts.'
  },
  businessCreator: {
    tier: 'startup',
    model: 'gpt3'
  },
  negotiator: {
    tier: 'pro',
    model: 'gpt3'
  },
  dataDigger: {
    tier: 'pro',
    model: 'gpt3'
  },
  ipAttorney: {
    tier: 'pro',
    model: 'gpt3'
  },
  pitchDeck: {
    tier: 'pro',
    model: 'gpt4'
  },
  promptCreator: {
    tier: 'enterprise',
    model: 'gpt3'
  },
  businessConsultant: {
    tier: 'enterprise',
    model: 'gpt4'
  },
  financialAdvisor: {
    tier: 'enterprise',
    model: 'gpt4'
  },
  codeExperts: {
    tier: 'enterprise',
    model: 'gpt4'
  },
  botGenerator: {
    tier: 'superuser',
    model: 'gpt4'
  },
  ana: {
    tier: 'superuser',
    model: 'gpt4',
    bots: availableBots
  }
} as Record<BotType, BotMetadata>;

export const BotTiers: Readonly<Exclude<TierType, 'superuser'>[]> = [
  'pro',
  'free',
  'startup',
  'enterprise'
] as const;

export const getBotMeta = (bot: BotType) => BotMeta[bot] ?? defaultMeta;

export const getBotModel = (bot: BotType) => getModel(getBotMeta(bot).model);

export const BotUI: BotUIType[] = availableBots.map((bot) => ({
  name: bot === 'ana' ? 'ANA' : camelCaseToTitleCase(bot),
  plan: getBotMeta(bot).tier,
  value: bot
}));
