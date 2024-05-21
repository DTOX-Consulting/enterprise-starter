import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _BusinessModel = `
Here are the sections needed:
- Tagline (10 words)
  A concise and impactful statement summarizing your business.

- Introduction (100 words)
  Brief overview of your company, including mission and vision.
  Explanation of the business model document's purpose and its importance in strategic direction.
  Emphasis on the business model's role in achieving the company's goals.

- Value Propositions (200 words)
  Description of the unique value and benefits offered by your company.
  Highlighting how your products or services address customer problems or needs.

- Customer Segments (200 words)
  Definition of the specific groups of customers targeted.
  Details on their needs, behaviors, and characteristics.

- Channels (150 words)
  Channels used to communicate with and reach customer segments.
  Inclusion of distribution and marketing channels.

- Customer Relationships (150 words)
  Types of relationships established with different customer segments.
  Strategies for customer acquisition, retention, and growth.

- Revenue Streams (200 words)
  Various sources of revenue for your company.
  Pricing strategy, sales methods, and recurring revenue models.

- Key Resources (150 words)
  Essential resources needed to deliver the value proposition.
  Consideration of physical, intellectual, human, and financial resources.

- Key Activities (150 words)
  Crucial activities necessary for successful operation.
  Could include manufacturing, marketing, sales, or supply chain management.

- Key Partnerships (150 words)
  Listing of key partners and suppliers and their roles.
  Explanation of how these partnerships support the business model.

- Cost Structure (150 words)
  Major costs involved in the business model.
  Inclusion of both fixed and variable costs.

- Conclusion (100 words)
  Summary of how each element of the Business Model Canvas forms a cohesive and effective business model for your company.
`.trim();

export const BusinessModel = documentGenerationPrefixReplacer('business-model', _BusinessModel);
