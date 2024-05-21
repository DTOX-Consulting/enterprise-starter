import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _BrandingGuidelines = `
Here are the sections needed:
- Tagline (10 words)
  A brief phrase summarizing the essence of your brand.

- Introduction (100 words)
  Explain the purpose of branding guidelines and their importance in maintaining brand consistency for your company.

- Brand Story and Identity (200 words)
  Brand Story: Outline the history, mission, vision, and values of your company.
  Brand Identity: Define the core identity of the brand, including its personality, tone, and key messages.

- Logo Usage (200 words)
  Describe the logo design and its variations.
  Provide guidelines for logo usage, including sizing, spacing, and acceptable backgrounds.

- Color Palette (150 words)
  Detail the primary and secondary color palettes, including specific color codes (RGB, CMYK, Pantone, Hex).
  Explain the psychology behind chosen colors and where they should be used.

- Typography (150 words)
  Specify the typefaces used in the brand's visual materials.
  Include guidelines for font sizes, styles, and usage for different types of content.

- Imagery and Graphic Elements (200 words)
  Define the style of photography, illustrations, and other graphic elements that align with the brand.
  Provide examples and usage guidelines.

- Voice and Writing Style (200 words)
  Articulate the brand's voice and tone in written communications.
  Offer guidelines for writing style, including grammar, punctuation, and preferred language.

- Brand Application Examples (200 words)
  Show examples of how the branding should be applied across different mediums (e.g., website, business cards, advertising, packaging).

- Do's and Don'ts (150 words)
  List clear do's and don'ts to avoid common misuses of the brand assets.

- Conclusion (100 words)
  Conclude by emphasizing the importance of adhering to these guidelines to maintain brand integrity and recognition.
`.trim();

export const BrandingGuidelines = documentGenerationPrefixReplacer(
  'branding-guidelines',
  _BrandingGuidelines
);
