import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _ProductRoadmap = `
Here are the sections needed:
- Tagline (10 words)
  A succinct and engaging phrase capturing the essence of the product.

- Product Overview (1000 words)
  An extensive description of the product, covering its purpose, vision, and key aspects. This section should include at least three subheadings, each with a comprehensive paragraph underneath.
  - [Subheading 1]
    Detailed information about a specific aspect of the product.
  - [Subheading 2]
    In-depth look at another unique element of the product.
  - [Subheading 3]
    Further exploration of an additional critical feature or aspect.

- Product Features (500 words)
  An in-depth examination of at least three major features of the product. Each feature should be clearly titled and followed by a detailed description.
  - [Feature 1 Title]
    Detailed description of the first feature.
  - [Feature 2 Title]
    In-depth explanation of the second feature.
  - [Feature 3 Title]
    Comprehensive overview of the third feature.

- Product Phases & Timeline (500 words)
  A breakdown of the product's development into at least four phases, each with its own title, description, and timeline. The section should include bullet points detailing the plan, potential risks, and success metrics for each phase.
  - [Phase 1 Title]
    Description and timeline. Bullet points for plan, risks, and success metrics.
  - [Phase 2 Title]
    Description and timeline. Bullet points for plan, risks, and success metrics.
  - [Phase 3 Title]
    Description and timeline. Bullet points for plan, risks, and success metrics.
  - [Phase 4 Title]
    Description and timeline. Bullet points for plan, risks, and success metrics.

- Product Summary (400 words)
  A comprehensive summary of the entire product roadmap, not merely reiterating the product overview. This summary should encapsulate the key points of the roadmap and include a call to action, guiding the reader on the next steps or what to anticipate.

For all the titles and headings i.e. [Subheading 1], [Feature 1 Title], or [Phase 1 Title] ensure you replace the template with actual titles
`.trim();

export const ProductRoadmap = documentGenerationPrefixReplacer('product-roadmap', _ProductRoadmap);
