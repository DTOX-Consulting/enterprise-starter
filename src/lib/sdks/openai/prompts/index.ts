import { AddressableMarket } from '@/lib/sdks/openai/prompts/AddressableMarket';
import { ArticlesOfIncorporation } from '@/lib/sdks/openai/prompts/ArticlesOfIncorporation';
import { BlogPost } from '@/lib/sdks/openai/prompts/BlogPost';
import { BrandingGuidelines } from '@/lib/sdks/openai/prompts/BrandingGuidelines';
import { BusinessConsultant } from '@/lib/sdks/openai/prompts/BusinessConsultant';
import { BusinessDescription } from '@/lib/sdks/openai/prompts/BusinessDescription';
import { BusinessIndustry } from '@/lib/sdks/openai/prompts/BusinessIndustry';
import { BusinessModel } from '@/lib/sdks/openai/prompts/BusinessModel';
import { BusinessName } from '@/lib/sdks/openai/prompts/BusinessName';
import { BusinessPlan } from '@/lib/sdks/openai/prompts/BusinessPlan';
import { Code } from '@/lib/sdks/openai/prompts/Code';
import { CompanyBylaws } from '@/lib/sdks/openai/prompts/CompanyBylaws';
import { CustomerPersona } from '@/lib/sdks/openai/prompts/CustomerPersona';
import { CustomerSupport } from '@/lib/sdks/openai/prompts/CustomerSupport';
import { ElevatorPitch } from '@/lib/sdks/openai/prompts/ElevatorPitch';
import { Email } from '@/lib/sdks/openai/prompts/Email';
import { ExitStrategy } from '@/lib/sdks/openai/prompts/ExitStrategy';
import { FinancialAdvisor } from '@/lib/sdks/openai/prompts/FinancialAdvisor';
import { FinancialPlan } from '@/lib/sdks/openai/prompts/FinancialPlan';
import { GTMStrategy } from '@/lib/sdks/openai/prompts/GTMStrategy';
import { Image } from '@/lib/sdks/openai/prompts/Image';
import { Instagram } from '@/lib/sdks/openai/prompts/Instagram';
import { IPStrategy } from '@/lib/sdks/openai/prompts/IPStrategy';
import { LeanCanvas } from '@/lib/sdks/openai/prompts/LeanCanvas';
import { Learn } from '@/lib/sdks/openai/prompts/Learn';
import { LinkedIn } from '@/lib/sdks/openai/prompts/LinkedIn';
import { MarketingPlan } from '@/lib/sdks/openai/prompts/MarketingPlan';
import { MissionStatement } from '@/lib/sdks/openai/prompts/MissionStatement';
import { NewsLetter } from '@/lib/sdks/openai/prompts/NewsLetter';
import { OperationalPlan } from '@/lib/sdks/openai/prompts/OperationalPlan';
import { PitchDeck } from '@/lib/sdks/openai/prompts/PitchDeck';
import { PressRelease, PressReleaseProduct } from '@/lib/sdks/openai/prompts/PressRelease';
import { ProblemStatement } from '@/lib/sdks/openai/prompts/ProblemStatement';
import { ProductRoadmap } from '@/lib/sdks/openai/prompts/ProductRoadmap';
import { Rewriter } from '@/lib/sdks/openai/prompts/Rewriter';
import { SalesScript } from '@/lib/sdks/openai/prompts/SalesScript';
import { SEOContent } from '@/lib/sdks/openai/prompts/SEOContent';
import { SEOStrategy } from '@/lib/sdks/openai/prompts/SEOStrategy';
import { SwotAnalysis } from '@/lib/sdks/openai/prompts/SwotAnalysis';
import { Tagline } from '@/lib/sdks/openai/prompts/Tagline';
import { Twitter } from '@/lib/sdks/openai/prompts/Twitter';
import { VisionStatement } from '@/lib/sdks/openai/prompts/VisionStatement';
import { Writer, WriterShort } from '@/lib/sdks/openai/prompts/Writer';

const Prompts = {
  none: '',
  code: Code,
  email: Email,
  image: Image,
  learn: Learn,
  writer: Writer,
  tagline: Tagline,
  twitter: Twitter,
  linkedin: LinkedIn,
  blogPost: BlogPost,
  rewriter: Rewriter,
  pitchDeck: PitchDeck,
  instagram: Instagram,
  leanCanvas: LeanCanvas,
  newsLetter: NewsLetter,
  ipStrategy: IPStrategy,
  seoContent: SEOContent,
  seoStrategy: SEOStrategy,
  gtmStrategy: GTMStrategy,
  salesScript: SalesScript,
  writerShort: WriterShort,
  exitStratgy: ExitStrategy,
  pressRelease: PressRelease,
  swotAnalysis: SwotAnalysis,
  businessPlan: BusinessPlan,
  businessName: BusinessName,
  businessModel: BusinessModel,
  elevatorPitch: ElevatorPitch,
  financialPlan: FinancialPlan,
  marketingPlan: MarketingPlan,
  companyBylaws: CompanyBylaws,
  productRoadmap: ProductRoadmap,
  customerSupport: CustomerSupport,
  customerPersona: CustomerPersona,
  operationalPlan: OperationalPlan,
  visionStatement: VisionStatement,
  missionStatement: MissionStatement,
  problemStatement: ProblemStatement,
  businessIndustry: BusinessIndustry,
  financialAdvisor: FinancialAdvisor,
  addressableMarket: AddressableMarket,
  brandingGuidelines: BrandingGuidelines,
  businessConsultant: BusinessConsultant,
  pressReleaseProduct: PressReleaseProduct,
  businessDescription: BusinessDescription,
  articlesOfIncorporation: ArticlesOfIncorporation
} as const;

const notDocuments = ['none'] as const;

export type PromptType = keyof typeof Prompts;
export type NotDocuments = (typeof notDocuments)[number];
export type DocumentType = Exclude<PromptType, NotDocuments>;

export const getPrompt = (prompt: PromptType) => {
  const promptDescription = Prompts[prompt];

  return `
This is the next layer of the persona.
Your (ANA) Persona: ${promptDescription}

Guidelines for Response:
1. Ensure the response is relevant to the persona.
2. Provide insights and information that align with the persona's characteristics.
3. Tailor the content to the persona's preferences and needs.
4. Deliver content that resonates with the persona's context and interests.
`.trim();
};

export const availablePrompts = Object.keys(Prompts) as PromptType[];

export const availableDocuments = Object.keys(Prompts).filter(
  (p) => !notDocuments.includes(p as NotDocuments)
) as DocumentType[];

export const isPrompt = (prompt: string): prompt is PromptType =>
  availablePrompts.includes(prompt as PromptType);

export const isDocument = (prompt: string): prompt is DocumentType =>
  availableDocuments.includes(prompt as DocumentType);
