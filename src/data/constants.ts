import type { BusinessChangeKeys } from '@/data/guards';
import type { Option } from '@/data/option';

export const industries: Option[] = [
  {
    label: 'Aerospace',
    value: 'aerospace'
  },
  {
    label: 'Chemical',
    value: 'chemical'
  },
  {
    label: 'Computer',
    value: 'computer'
  },
  {
    label: 'Construction',
    value: 'construction'
  },
  {
    label: 'Food & Drinks',
    value: 'food & drinks'
  },
  {
    label: 'Education',
    value: 'education'
  },
  {
    label: 'Energy',
    value: 'energy'
  },
  {
    label: 'Environment',
    value: 'environment'
  },
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Finance',
    value: 'finance'
  },
  {
    label: 'Logistics',
    value: 'logistics'
  },
  {
    label: 'Manufacturing',
    value: 'manufacturing'
  },
  {
    label: 'Media',
    value: 'media'
  },
  { label: 'Telecommunications', value: 'telecommunications' },
  {
    label: 'Transportation',
    value: 'transportation'
  },
  {
    label: 'Travel',
    value: 'travel'
  }
];

export const organizationTypes: Option[] = [
  {
    label: 'Personal',
    value: 'personal'
  },
  {
    label: 'Team',
    value: 'team'
  },
  {
    label: 'Company',
    value: 'company'
  },
  {
    label: 'Non-Profit',
    value: 'non-profit'
  },
  {
    label: 'Agency',
    value: 'agency'
  },
  {
    label: 'Educational',
    value: 'educational'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

export const FeatureInformation: Record<BusinessChangeKeys, (value?: string) => string[]> = {
  name: () => [
    "The name of your business is crucial for establishing brand recognition and recall. It's the first impression customers get of your brand, shaping their perception of your products or services.",
    "A strong business name should be memorable, unique, and reflective of your brand's values and identity. It sets the tone for your marketing efforts and helps you stand out in a crowded marketplace.",
    "Consider the emotional response you want to evoke in your target audience when choosing a name. Whether it's aspirational, descriptive, or whimsical, your business name should resonate with your target demographic and leave a lasting impression."
  ],

  image: () => [
    "Your business image plays a key role in shaping how customers perceive your brand. It's a visual representation of your identity and values, conveying your brand personality and positioning in the market.",
    'A compelling business image should be eye-catching, professional, and aligned with your brand identity. It should capture the essence of your business and resonate with your target audience, creating a strong first impression that draws customers in.',
    "When selecting an image for your business, consider the emotions and associations you want to evoke in your customers. Whether it's trust, excitement, or sophistication, your image should reflect the values and qualities that set your brand apart from competitors."
  ],

  description: () => [
    'A compelling business description is essential for articulating what sets your brand apart and why customers should choose you over competitors.',
    'Use your description to highlight your unique selling points, such as the quality of your products or services, your commitment to customer satisfaction, or your innovative approach to solving common problems.',
    'Think of your description as a sales pitch that communicates the value proposition of your business in a concise and engaging manner. Focus on the benefits customers will receive from choosing your brand, rather than just listing features.'
  ],

  vision: () => [
    "Your business vision serves as a guiding light that inspires and motivates both you and your team. It's a statement of where you aspire to be in the future and what you hope to achieve.",
    'A compelling vision paints a vivid picture of the impact you want your business to have on the world. It captures the essence of your aspirations and acts as a compass for decision-making, helping you stay focused on your long-term goals.',
    'When crafting your vision statement, think big and be bold. It should be ambitious yet attainable, stretching your imagination while remaining grounded in reality. Your vision should inspire passion and commitment in everyone who encounters it, from employees to investors to customers.'
  ],

  mission: () => [
    "Your mission statement defines the purpose and values that drive your business. It's a declaration of your company's reason for existence and the principles that guide its operations.",
    "A well-crafted mission statement communicates your brand's core beliefs, goals, and commitments to stakeholders. It answers the fundamental question of 'why' your business exists and serves as a touchstone for decision-making at all levels of the organization.",
    'When developing your mission statement, consider the impact you want to have on society and the legacy you hope to leave behind. Focus on the value you create for customers, employees, and the community at large, emphasizing your dedication to making a positive difference in the world.'
  ],

  problem: () => [
    'Identifying and addressing a specific problem is the foundation of any successful business venture. By understanding the pain points and challenges faced by your target audience, you can develop products or services that offer meaningful solutions.',
    "Your ability to solve a problem effectively is what sets you apart from competitors and attracts customers to your brand. Whether it's streamlining processes, improving efficiency, or enhancing quality of life, your solutions should address real needs and deliver tangible benefits.",
    'When defining the problem your business solves, be specific and focused. Narrow down your target market and clearly articulate the pain points you aim to alleviate. By honing in on a niche problem, you can position your brand as an expert in that domain and build trust with your audience.'
  ],

  tagline: () => [
    "A memorable tagline is like a mini-mission statement for your brand, encapsulating its essence in just a few words. It's a powerful tool for communicating your value proposition and differentiating yourself from competitors.",
    'The best taglines are short, catchy, and easy to remember. They capture the unique selling points of your brand and evoke an emotional response in your target audience, making your brand more memorable and appealing.',
    "When crafting your tagline, focus on what makes your brand special and why customers should choose you. Whether it's your commitment to quality, your innovative approach, or your customer-centric philosophy, your tagline should convey what sets you apart and why you're worth remembering."
  ],

  industry: () => [
    'Understanding your industry landscape is essential for positioning your business for success. By staying informed about industry trends, competitive dynamics, and regulatory changes, you can make informed decisions and seize opportunities for growth.',
    'Your industry knowledge gives you a strategic advantage in identifying emerging market trends and adapting your business model accordingly. It allows you to anticipate customer needs, stay ahead of competitors, and innovate proactively.',
    'When analyzing your industry, pay attention to key drivers of change, such as technological advancements, shifting consumer preferences, and macroeconomic factors. By staying ahead of the curve, you can position your business as a leader in your field and stay resilient in the face of uncertainty.'
  ]
};
