import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _CustomerPersona = `
Here are the sections needed:
- Tagline (10 words)
  A succinct phrase capturing the essence of understanding your customer base.

- Introduction (100 words)
  An explanation of the importance and role of customer personas in developing business strategies.

- Customer Personas (1000 words)
  Develop 4 distinct customer personas, each representing different segments of the target market. Include the following details for each persona:
    - Demographics: Age, gender, location, income level, education, family status.
    - Occupation and Career Goals: Job role, industry, career path, professional challenges.
    - Psychographics: Interests, hobbies, values, lifestyle choices.
    - Buying Motivations: What drives their purchasing decisions and the primary needs related to your products/services.
    - Media Consumption: Preferred channels for information and entertainment.
    - Pain Points: Specific challenges they face that your product/service can address.

- Application of Personas in Business Strategy (200 words)
  Discuss how these personas will guide and influence various aspects of business, such as marketing strategies, product development, sales techniques, and customer service.

- Conclusion (100 words)
  Sum up the significance of customer personas in achieving targeted and effective business strategies, highlighting their value in understanding and catering to the diverse needs of your market.
`.trim();

export const CustomerPersona = documentGenerationPrefixReplacer(
  'customer-persona-profiles',
  _CustomerPersona
);
