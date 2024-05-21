import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _SalesScript = `
Here are the sections needed:
- Tagline (10 words)
  A brief, impactful phrase summarizing the essence of your sales approach.

- Introduction (100 words):
  Briefly describe the purpose of the sales scripts and the products/services they are designed to sell.

- Script for Initial Contact (200 words):
  Objective: To introduce the product/service and engage the potential customer.
  Key Points: Highlight the unique selling proposition and briefly mention how it addresses a common pain point or need.
  Engagement Questions: Include questions to understand the customer's needs better and to keep the conversation interactive.

- Script for Product Demonstration (300 words):
  Objective: To showcase the features and benefits of the product/service.
  Feature Explanation: Detail the main features and how they translate into real-world benefits for the customer.
  Customer Engagement: Include pauses for questions and feedback, ensuring it's a two-way conversation.

- Script for Handling Objections (250 words):
  Objective: To address common objections effectively.
  Common Objections: List typical objections related to price, competition, or product features.
  Rebuttals and Solutions: Provide well-thought-out responses that acknowledge the customer's concerns and offer solutions or alternative perspectives.

- Script for Closing the Sale (200 words):
  Objective: To persuade the customer to make a purchase decision.
  Closing Techniques: Include effective closing techniques tailored to the product/service, such as the assumptive close, urgency close, or consultative close.
  Follow-Up Actions: Detail the next steps post-sale, such as signing a contract, making a payment, or arranging delivery.

- Script for Follow-Up and Relationship Building (150 words):
  Objective: To maintain customer engagement post-sale and build long-term relationships.
  Content: Include a thank-you message, a check-in on the product/service satisfaction, and an invitation for feedback.
  Future Engagement: Suggest ways to stay in touch, like subscribing to a newsletter or following social media channels.

- Conclusion (100 words):
  Summarize the importance of having structured sales scripts and their role in achieving consistent sales performance and customer satisfaction.
`.trim();

export const SalesScript = documentGenerationPrefixReplacer('sales-scripts', _SalesScript);
