import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _AddressableMarket = `
Here are the sections needed:
- Tagline (10 words)
  A concise statement summarizing the overarching market strategy or focus.

- Total Addressable Market (TAM) (200 words)
  Analysis of the overall market potential for the product or service.

- Serviceable Available Market (SAM) (200 words)
  A closer look at the segment of TAM that is actually reachable by your products or services.

- Serviceable Obtainable Market (SOM) (200 words)
  The portion of SAM that you can capture, considering current market conditions and competition.

- Target Market (200 words)
  A detailed description of the specific market segment you are targeting.

- Target Market Size (200 words)
  An estimation of the size of your target market, in terms of potential customers or revenue.

- Target Market Growth (200 words)
  Analysis of the growth potential and trends within your target market.

- Target Market Trends (200 words)
  An overview of the latest trends, patterns, and changes occurring within your target market.

- Target Market Segmentation (200 words)
  Breakdown of the target market into smaller, more specific segments.

- Target Market Demographics (200 words)
  Demographic analysis of the target market, including age, gender, income, education, etc.

- Target Market Psychographics (200 words)
  Study of the attitudes, interests, personality, values, and lifestyles of your target market.

- Target Market Behaviors (200 words)
  Examination of the purchasing and consumption behaviors of your target market.

- Target Market Motivations (200 words)
  Insights into what drives your target market to make purchasing decisions.

- Target Market Pain Points (200 words)
  Identification of the problems, challenges, or needs faced by your target market.
`.trim();

export const AddressableMarket = documentGenerationPrefixReplacer(
  'addressable-market',
  _AddressableMarket
);
