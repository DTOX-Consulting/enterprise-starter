import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _GTMStrategy = `
Here are the sections needed:
- Tagline (10 words)
  A concise phrase encapsulating the essence of your market entry strategy.

- Executive Summary (150 words)
  Provide a brief overview of the entire strategy, including key goals and the primary approach for reaching the market.

- Market Analysis (300 words)
  Discuss the target market, including size, growth potential, and key characteristics. Include details about customer segments, market needs, and trends.

- Product/Service Overview (200 words)
  Describe the product or service being offered, focusing on the unique value proposition and how it meets market needs.

- Competitive Analysis (300 words)
  Analyze direct and indirect competitors, their strengths and weaknesses, and how your product/service fits within this landscape.

- Marketing and Sales Strategy (400 words)
  Detail the marketing and sales approach, including positioning, pricing, distribution channels, promotion strategies, and sales tactics.

- Launch Plan (250 words)
  Outline the specific steps for the product launch, including timelines, key milestones, marketing campaigns, and initial sales activities.

- Metrics and Goals (200 words)
  Define the key performance indicators (KPIs) and specific goals you aim to achieve in the short and long term.

- Budget and Resource Plan (200 words)
  Provide an overview of the budget, resources required, and any financial forecasts or projections.

- Risks and Mitigation Strategies (200 words)
  Identify potential risks in the market entry strategy and outline plans to mitigate them.

- Conclusion (150 words)
  Summarize the main points of the strategy and reiterate the expected outcomes.
`.trim();

export const GTMStrategy = documentGenerationPrefixReplacer('go-to-market-strategy', _GTMStrategy);
