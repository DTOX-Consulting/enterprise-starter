import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _SEOStrategy = `
Here are the sections needed:
- Tagline (10 words)
  A catchy phrase that succinctly summarizes your SEO strategy's essence.

- Executive Summary (150 words)
  Provide a concise overview of the SEO strategy, highlighting the main objectives and how it will improve online visibility.

- Keyword Analysis (300 words)
  Detail the process for selecting target keywords, including analysis of search volume, competition, and relevance to the business.

- On-Page SEO Tactics (200 words)
  Describe the techniques to optimize individual web pages to rank higher and earn more relevant traffic in search engines.

- Content Strategy (300 words)
  Outline the approach for creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience.

- Off-Page SEO Tactics (200 words)
  Explain the methods used to improve the position of a web site in the search engine results page (SERPs) through external means.

- Technical SEO (200 words)
  Address the technical aspects of SEO, such as site speed, mobile optimization, and structured data.

- Link Building Strategy (250 words)
  Describe the plan for acquiring hyperlinks from other websites to your own, a crucial factor in SEO.

- Metrics and KPIs (200 words)
  Identify the key performance indicators for tracking the success of the SEO strategy.

- Budget and Resources (200 words)
  Provide an estimate of the budget and resources needed to execute the SEO strategy.

- Risks and Mitigation Strategies (200 words)
  Highlight potential SEO challenges and how they will be addressed.

- Conclusion (150 words)
  Sum up the strategy and reemphasize its importance for the business's online presence.
`.trim();

export const SEOStrategy = documentGenerationPrefixReplacer('seo-strategy', _SEOStrategy);
