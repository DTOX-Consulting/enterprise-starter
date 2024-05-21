import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _LeanCanvas = `
Here are the sections needed:
- Tagline (10 words)
  A concise and impactful statement summarizing your business idea.

- Problem (100 words)
  Bullet points outlining the key problems your product or service addresses.

- Solution (100 words)
  Bullet points describing how your product or service solves the identified problems.

- High-Level Concept (50 words)
  Bullet points providing a broad overview of your business idea or approach.

- Key Metrics (50 words)
  Bullet points listing the main indicators to measure the success of your business.

- Unique Value Proposition (200 words)
  Bullet points detailing what makes your product unique and how it stands out from competitors.

- Unfair Advantage (200 words)
  Bullet points explaining the aspects of your product that provides a competitive edge, including barriers to replication.

- Channels (100 words)
  Bullet points describing the various channels through which you will reach your customers.

- Customer Segments (100 words)
  Bullet points identifying the specific groups of customers your business targets.

- Early Adopters (50 words)
  Bullet points highlighting the initial target market that is likely to adopt your product first.

- Existing Alternatives (50 words)
  Bullet points discussing current alternatives or competitors in the market.

- Revenue Streams (100 words)
  Bullet points outlining the various sources of revenue for your business.

- Cost Structure (100 words)
  Bullet points detailing the major costs involved in running your business.
`.trim();

export const LeanCanvas = documentGenerationPrefixReplacer('lean-canvas', _LeanCanvas);
