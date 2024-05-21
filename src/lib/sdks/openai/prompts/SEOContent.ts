import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _SEOContent = `
Here are the sections needed:

- Tagline (10 words)
  A catchy phrase that succinctly summarizes your SEO content strategy's essence.

- SEO Content Strategy Overview (300 words)
  Define the overarching goals and objectives of the SEO content strategy, targeting audience engagement, keyword optimization, and desired outcomes.

- Keyword Research and Selection (300 words)
  Detail the process for selecting target keywords, focusing on search volume, competition, and relevance to the business and its offerings.

- Site-Wide SEO Recommendations (250 words)
  Offer general SEO guidelines for the website, emphasizing URL structure, internal linking strategy, mobile optimization, and site speed.

Page-Specific SEO Content Recommendations:
Each section below should include a brief overview of the page’s purpose along with specific recommendations for the page heading, title, meta description, and targeted keywords. Based on the company and its offerings, also add other pages as needed with the same format.

- Home Page (300 words)
  Page Heading: [Insert heading]
  Title: [Insert title]
  Meta Description: [Insert meta description]
  Keywords: [Insert keywords]

- About Us Page (250 words)
  Page Heading: [Insert heading]
  Title: [Insert title]
  Meta Description: [Insert meta description]
  Keywords: [Insert keywords]

- Contact Us Page (200 words)
  Page Heading: [Insert heading]
  Title: [Insert title]
  Meta Description: [Insert meta description]
  Keywords: [Insert keywords]

- Product/Service Pages (Each 300 words)
  Overview: Describe each product/service, focusing on benefits and features.
  Page Heading: [Insert heading for each product/service]
  Title: [Insert title for each product/service]
  Meta Description: [Insert meta description for each product/service]
  Keywords: [Insert keywords for each product/service]

Conclusion (150 words)
  Summarize the key elements of the SEO content strategy and its expected impact on enhancing the website’s visibility and engaging the target audience.

Additional Instructions:
- Content for each page should be engaging, informative, and optimized for SEO with keywords integrated naturally.
- Craft the title, meta description, and headings for each page to capture attention and include primary keywords.
- Recommend a content update schedule to maintain website freshness and support SEO efforts.
- Identify opportunities for supporting content such as blog posts or articles that align with the SEO strategy and engage the audience.
`.trim();

export const SEOContent = documentGenerationPrefixReplacer('seo-content', _SEOContent);
