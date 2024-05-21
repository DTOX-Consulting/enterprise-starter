import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _ExitStrategy = `
Here are the sections needed:
- Tagline (10 words)
  A succinct phrase summarizing the strategic approach to exiting the business.

- Introduction (100 words)
  Briefly describe the importance of having an exit strategy for a business and its relevance to your company.

- Evaluation of Exit Strategy Options (600 words)
  Acquisition: Discuss the potential for selling the company to another larger company. Include considerations for identifying suitable buyers and valuation methods.
  Merger: Explore the possibility of merging with a similar or complementary company, including benefits and challenges.
  Initial Public Offering (IPO): Assess the feasibility and implications of going public.
  Management Buyout (MBO): Consider the possibility of selling the business to its current management team.
  Family Succession: If applicable, discuss the prospect of passing the business to a family member.
  Liquidation and Close: Address the scenario of closing the business and liquidating assets.
  Employee Stock Ownership Plan (ESOP): Evaluate the potential for transitioning ownership to employees.

- Timing and Market Considerations (200 words)
  Discuss the ideal timing for implementing an exit strategy, considering market conditions and the company's life cycle.

- Legal and Financial Implications (200 words)
  Outline the key legal and financial considerations for each exit strategy, including tax implications and necessary legal processes.

- Succession and Transition Planning (200 words)
  Address how the company will manage the transition during the exit, ensuring minimal disruption to operations and maintaining value for stakeholders.

- Conclusion (100 words):
  Summarize the preferred exit strategies for your company and their importance in ensuring long-term success and viability.
`.trim();

export const ExitStrategy = documentGenerationPrefixReplacer('exit-strategy', _ExitStrategy);
