import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _MarketingPlan = `
Here are the sections needed:
- Tagline (10 words)
  A brief, impactful phrase that encapsulates your marketing strategy's core message.

- Market Research (200 words)
  Analysis of market trends, customer behavior, and industry dynamics.

- Target Market (200 words)
  Detailed description of your primary audience, including demographic, geographic, and psychographic profiles.

- Product or Service (200 words)
  Comprehensive overview of the product or service being marketed, highlighting features and benefits.

- Competition (200 words)
  Evaluation of key competitors, their strategies, strengths, and weaknesses.

- Unique Selling Proposition (200 words)
  Explanation of what makes your product or service unique and why it stands out in the market.

- Mission Statement (200 words)
  A statement that defines the purpose and primary objectives of your marketing efforts.

- Market Strategies (200 words)
  Outline of the approaches and tactics you plan to use to achieve your marketing objectives.

- Pricing, Positioning, and Branding (200 words)
  Strategy for pricing your products or services, positioning them in the market, and branding considerations.

- User Acquisition Plan (300 words)
  Detailed plan on how to attract and retain customers, including channels and techniques for customer acquisition.

- Budget (200 words)
  A detailed breakdown of the marketing budget, allocating resources across various marketing activities.

- Marketing Goals (200 words)
  Clear and measurable objectives that your marketing plan aims to achieve within a specific timeframe.
`.trim();

export const MarketingPlan = documentGenerationPrefixReplacer('marketing-plan', _MarketingPlan);
