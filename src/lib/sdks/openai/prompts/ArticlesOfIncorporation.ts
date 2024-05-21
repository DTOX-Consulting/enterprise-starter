import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _ArticlesOfIncorporation = `
Here are the sections needed:
- Tagline (10 words)
  A brief, impactful phrase summarizing the essence of the corporation.

- Introduction (100 words)
  Briefly explain the purpose of Articles of Incorporation.
  Highlight their importance in legally establishing your company as a corporation.

- Name and Type of Corporation (100 words)
  State the full legal name of your company.
  Specify the type of corporation (e.g., C-Corp, S-Corp, Non-Profit).

- Purpose of the Corporation (150 words)
  Clearly define the purpose of your company.
  Include both specific and general operational purposes.

- Duration of the Corporation (50 words)
  State the intended duration of the corporation (perpetual or fixed-term).

- Principal Place of Business (100 words)
  Provide the physical address of the corporation's principal place of business.

- Registered Agent and Office (150 words)
  Identify the registered agent for legal and official documents.
  Include the address of the registered office.

- Share Structure (200 words)
  Detail the class and number of shares the corporation is authorized to issue.
  Describe rights, preferences, and limitations of each class of shares, if more than one class is authorized.

- Board of Directors (200 words)
  Outline the initial board of directors who will manage the corporation.
  Include names and addresses of each director.

- Incorporator Information (150 words)
  Provide the name and address of the incorporator(s) responsible for executing the Articles.
  Include a statement from the incorporator(s) affirming the establishment of the corporation.

- Additional Provisions (200 words)
  Address any additional clauses or provisions relevant to your company, such as indemnification of officers and directors, shareholder rights, etc.

- Conclusion and Signatures (100 words)
  Conclude with a statement declaring the intent to form the corporation under the relevant state laws.
  Provide space for signatures of the incorporator(s) and date of signing.
`.trim();

export const ArticlesOfIncorporation = documentGenerationPrefixReplacer(
  'articles-of-incorporation',
  _ArticlesOfIncorporation
);
