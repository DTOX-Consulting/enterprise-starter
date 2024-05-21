import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _FinancialPlan = `
Here are the sections needed:
- Tagline (10 words)
  A succinct phrase encapsulating the core financial strategy of the company.

- Executive Summary (150 words)
  Overview of the financial projections and key strategic elements of the document.

- Business Overview (200 words)
  Detailed description of the business model, products/services, target market, and competitive environment.

- Monetization Strategy (400 words)
  Explain how the product/service will generate revenue, including pricing models, sales projections, and revenue forecasts.
  Detailed explanation of the pricing strategy, including the rationale behind chosen price points and their expected impact on sales and market positioning.

- Revenue Projections (300 words)
  Comprehensive revenue forecast for the next 5 years, including market analysis and sales projections.

- Cost Analysis (300 words)
  In-depth analysis of both fixed and variable costs, covering all major expense categories.

- Break-Even Analysis (300 words)
  Detailed calculation of the break-even point, analyzing how the pricing strategy affects cost and revenue balance.

- Cash Flow Projections (300 words)
  Month-by-month cash flow forecast for the next , showing the influence of pricing and sales strategies on revenue and expenses.

- Profit and Loss Statement (P&L) Projection (300 words)
  Comprehensive P&L projection, incorporating the impact of pricing on revenue, cost of goods sold, and overall profitability.

- Balance Sheet Projections (300 words)
  Detailed balance sheet forecast, taking into account the financial implications of the business's revenue and expense structures.

- Investment and Funding Needs (200 words)
  Analysis of funding requirements, aligning financial needs with business objectives and growth strategies.

- Risk Analysis and Mitigation Strategies (200 words)
  Thorough assessment of financial and pricing-related risks, along with strategies for mitigation.

- Conclusion (150 words)
  Summation of the document, highlighting the coherence of the pricing strategy with the overall financial and business goals.
`.trim();

export const FinancialPlan = documentGenerationPrefixReplacer('financial-plan', _FinancialPlan);
