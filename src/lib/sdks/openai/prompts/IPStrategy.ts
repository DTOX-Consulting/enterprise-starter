import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _IPStrategy = `
Here are the sections needed:
- Tagline (10 words)
  A concise statement encapsulating your company's approach to intellectual property.

- Introduction (100 words)
  Discuss the importance of an intellectual property strategy for your company.
  Highlight its role in enhancing business success.

- Identification of IP Assets (200 words)
  Enumerate current IP assets such as patents, trademarks, copyrights, and trade secrets.
  Explain the value and role of each IP asset in the business.

- IP Creation and Acquisition Plan (200 words)
  Outline strategies for the creation and acquisition of new IP.
  Detail plans for research and development, creative processes, and collaborations leading to new IP.

- Protection Strategy (250 words)
  Describe the steps for protecting various IP assets, including legal registrations and patent filings.
  Discuss the geographical scope of protection, including international considerations.

- IP Enforcement and Defense Plan (200 words)
  Explain the approach to monitoring and enforcing IP rights.
  Outline procedures for defending against IP rights disputes or legal challenges.

- Commercialization and Monetization (200 words)
  Discuss strategies for IP commercialization or monetization, such as licensing or selling IP rights.
  Include marketing strategies for IP and approaches to find potential licensees or buyers.

- Risk Management and Compliance (200 words)
  Identify potential risks related to IP, including infringement risks and competitive threats.
  Outline compliance measures with IP laws and regulations.

- IP Management and Review (150 words)
  Explain how IP assets will be managed and tracked.
  Describe the process for periodic review and updating of the IP strategy.

- Conclusion (100 words)
  Emphasize the importance of the IP strategy in supporting innovation and long-term growth for your company.
`.trim();

export const IPStrategy = documentGenerationPrefixReplacer(
  'intellectual-property-strategy',
  _IPStrategy
);
