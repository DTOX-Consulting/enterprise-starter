import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _SwotAnalysis = `
Here are the sections needed:
- Tagline (10 words)
  A concise phrase summarizing the essence of your strategic analysis.

- Strengths (300 words)
  Evaluate the company's internal strengths, including areas such as market position, innovation, resources, customer relationships, and operational efficiency.

- Weaknesses (300 words)
  Identify the company's internal weaknesses, focusing on aspects like resource limitations, market challenges, operational difficulties, product/service limitations, and strategic direction issues.

- Opportunities (300 words)
  Explore external opportunities available to the company in the current market, including trends, technological advancements, potential partnerships, and customer demand shifts.

- Threats (300 words)
  Assess external threats that the company faces, such as competitive pressures, market instability, regulatory changes, and economic trends.
`.trim();

export const SwotAnalysis = documentGenerationPrefixReplacer('swot-analysis', _SwotAnalysis);
