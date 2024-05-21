import { ANA } from '@/lib/sdks/openai/bots/ANA';
import { BotGeneratorBot } from '@/lib/sdks/openai/bots/BotGenerator';
import { BusinessConsultantBot } from '@/lib/sdks/openai/bots/BusinessConsultant';
import { BusinessCreatorBot } from '@/lib/sdks/openai/bots/BusinessCreator';
import { CodeExpertsBot } from '@/lib/sdks/openai/bots/CodeExperts';
import { DataDiggerBot } from '@/lib/sdks/openai/bots/DataDigger';
import { DecisionBot } from '@/lib/sdks/openai/bots/Decision';
import { FinancialAdvisorBot } from '@/lib/sdks/openai/bots/FinancialAdvisor';
import { FundingGuideBot } from '@/lib/sdks/openai/bots/FundingGuide';
import { GenericBot } from '@/lib/sdks/openai/bots/Generic';
import { IPAttorneyBot } from '@/lib/sdks/openai/bots/IPAttorney';
import { LearnBot } from '@/lib/sdks/openai/bots/Learn';
import { NegotiatorBot } from '@/lib/sdks/openai/bots/Negotiator';
import { PitchDeckBot } from '@/lib/sdks/openai/bots/PitchDeck';
import { PromptCreatorBot } from '@/lib/sdks/openai/bots/PromptCreator';
import { SocialMediaBot } from '@/lib/sdks/openai/bots/SocialMedia';

const Bots = {
  ana: ANA,
  learn: LearnBot,
  decision: DecisionBot,
  allPurpose: GenericBot,
  pitchDeck: PitchDeckBot,
  ipAttorney: IPAttorneyBot,
  negotiator: NegotiatorBot,
  dataDigger: DataDiggerBot,
  socialMedia: SocialMediaBot,
  codeExperts: CodeExpertsBot,
  fundingGuide: FundingGuideBot,
  promptCreator: PromptCreatorBot,
  businessCreator: BusinessCreatorBot,
  financialAdvisor: FinancialAdvisorBot,
  businessConsultant: BusinessConsultantBot,
  botGenerator: BotGeneratorBot
} as const;

export type BotType = keyof typeof Bots;

export const getBot = (bot: BotType) => Bots[bot];

export const availableBots = Object.keys(Bots) as BotType[];

export const isBot = (bot: string): bot is BotType => availableBots.includes(bot as BotType);
