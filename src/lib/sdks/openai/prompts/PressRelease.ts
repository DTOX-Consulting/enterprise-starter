import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';
import { socialGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/SocialGeneration';

const _PressRelease = `
Here are the sections needed:
- Tagline (10 words)
  A concise, impactful phrase summarizing the core message.

- Headline (15 words)
  A clear and compelling headline that quickly captures the essence of the news.

- Subheading (25 words)
  An additional detail that supports the headline, offering a bit more context or information.

- Dateline (15 words)
  The city where the news is originating and the date of the release.

- Introduction (50 words)
  A brief introduction summarizing the key news or announcement.

- Body (300 words)
  The main section providing detailed information, including facts, figures, quotes, and any necessary context.

- Boilerplate (50 words)
  A short "about" section on the company or organization issuing the release.

- Call to Action (30 words)
  A directive to the reader for the next steps, such as visiting a website or contacting for more information.

- Contact Information (30 words)
  Essential contact details like name, phone number, and email address for further inquiries.

- About Us (50 words)
  A brief overview of the company or organization, highlighting its mission or key aspects.

- Media Contact (30 words)
  Contact information specifically for media relations, such as a PR contact.
`.trim();

export const PressRelease = documentGenerationPrefixReplacer('press-release', _PressRelease);

const _PressReleaseProduct = `
Write a press release for a new product launch.
The product is an innovative solution designed to address a specific problem.
Details about the product name and the specific problem it solves will be provided later.

The press release should include the following sections:
- Headline (15 words)
  An engaging and informative headline that succinctly introduces the product and its primary benefit.

- Summary (50 words)
  A concise overview of the press release, summarizing the product, the problem it solves, and its key selling points.

- Quote (30 words)
  A statement from a prominent figure in the company (like the CEO or Product Manager) emphasizing the significance and expected impact of the product.

- Body (200 words)
  In-depth information about the product, highlighting its features, advantages, intended users, and the specific issue it addresses. Include relevant data, research, or technical details that substantiate its effectiveness.

- Product Specifications (50 words)
  Detailed technical specifications or unique features of the product that are crucial for understanding its value.

- Availability and Pricing (50 words)
  Information on the product's availability, launch dates, and pricing details.

- Product Background/Development (50 words)
  Insights into the development process of the product, its inspiration, and any research involved in its creation.

- Images/Multimedia Links (30 words)
  High-quality images or links to videos demonstrating the product in use.

- Endorsements/Testimonials (50 words)
  Endorsements from industry experts or testimonials from early users, if available.

- FAQs (50 words)
  Answers to frequently asked questions about the product, addressing common queries or concerns.

- Contact Information (30 words)
  Essential contact details for further inquiries, such as the name, phone number, and email address of the company representative or public relations contact.
`.trim();

export const PressReleaseProduct = socialGenerationPrefixReplacer({
  length: '1000',
  type: 'PressRelease',
  lengthType: 'words',
  prompt: _PressReleaseProduct
});
