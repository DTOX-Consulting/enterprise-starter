import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _BusinessPlan = `
Here are the sections needed:
- Tagline (10 words)
  A concise and impactful statement summarizing your business.

- Executive Summary (250 words)
  A brief overview of the business plan, including the company's mission and objectives.

- Company Description (250 words)
  Detailed information about the company, its history, and its vision for the future.

- Founder and Team (250 words)
  Profiles of the founder and key team members, highlighting their skills and experience.

- Problem (200 words)
  Description of the problem or need your company addresses in the market.

- Solution (200 words)
  Explanation of how your company's products or services solve the identified problem.

- Products or Services (300 words)
  Detailed description of the products or services offered, including features and benefits.

- Market Analysis (300 words)
  Examination of the market, including size, growth, and trends.

- Marketing and Sales Strategy (300 words)
  Overview of marketing and sales approaches and channels to reach the target market.

- Competitive Analysis (500 words)
  Analysis of competitors, including strengths and weaknesses.
  - Differentiation
    Specific ways in which your company differs from competitors.

- Unique Value Proposition (500 words)
  Explanation of the unique value offered by your company.
  - Unfair Advantage
    Elements that give your company an edge over competitors.
  - Barrier to Replication
    Factors that prevent others from easily replicating your business model.
`.trim();

export const BusinessPlan = documentGenerationPrefixReplacer('business-plan', _BusinessPlan);
