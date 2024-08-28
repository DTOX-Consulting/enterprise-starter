import type { BusinessChangeKeys } from '@/data/guards';
import type { Option } from '@/data/option';

export const industries: (Option & { description: string })[] = [
  {
    label: 'Aerospace',
    value: 'aerospace',
    description:
      'Involves the design, development, and production of aircraft, spacecraft, and related systems.'
  },
  {
    label: 'Agriculture',
    value: 'agriculture',
    description:
      'Covers the production of food, fiber, and other goods through farming and cultivation practices.'
  },
  {
    label: 'Artificial Intelligence',
    value: 'artificial intelligence',
    description:
      'Involves the development of AI technologies and applications across various industries to enhance decision-making.'
  },
  {
    label: 'Automotive',
    value: 'automotive',
    description:
      'Covers the design, manufacturing, and sale of motor vehicles and automotive components.'
  },
  {
    label: 'Biotechnology',
    value: 'biotechnology',
    description:
      'Focuses on the application of biological systems and organisms to develop products and technologies.'
  },
  {
    label: 'Blockchain',
    value: 'blockchain',
    description:
      'Involves the development and application of blockchain technologies and cryptocurrencies.'
  },
  {
    label: 'Chemical',
    value: 'chemical',
    description:
      'Focuses on the production of chemicals and materials through chemical processes, including pharmaceuticals and petrochemicals.'
  },
  {
    label: 'Construction',
    value: 'construction',
    description:
      'Covers the building and engineering industries, including residential, commercial, and infrastructure projects.'
  },
  {
    label: 'Consulting',
    value: 'consulting',
    description:
      'Involves providing expert advice and guidance to businesses and organizations in various industries.'
  },
  {
    label: 'Cybersecurity',
    value: 'cybersecurity',
    description: 'Focuses on protecting systems, networks, and data from cyber threats and attacks.'
  },
  {
    label: 'Digital Marketing',
    value: 'digital marketing',
    description:
      'Focuses on promoting products and services through digital channels and platforms, including social media and online advertising.'
  },
  {
    label: 'E-commerce',
    value: 'e-commerce',
    description:
      'Involves the buying and selling of goods and services online, encompassing various digital platforms and marketplaces.'
  },
  {
    label: 'Education',
    value: 'education',
    description:
      'Includes schools, universities, and educational services, focusing on learning and development.'
  },
  {
    label: 'Energy',
    value: 'energy',
    description:
      'Centers on the production and distribution of energy, including renewable and non-renewable sources.'
  },
  {
    label: 'Environment',
    value: 'environment',
    description:
      'Focuses on environmental conservation, sustainability initiatives, and eco-friendly practices.'
  },
  {
    label: 'Fashion',
    value: 'fashion',
    description:
      'Involves the design, production, and sale of clothing, accessories, and fashion products.'
  },
  {
    label: 'Finance',
    value: 'finance',
    description:
      'Encompasses banking, investment, insurance, and financial services that manage money and assets.'
  },
  {
    label: 'Food & Beverage',
    value: 'food & beverage',
    description:
      'Involves the production, processing, and distribution of food products and beverages for consumption.'
  },
  {
    label: 'Gaming',
    value: 'gaming',
    description:
      'Focuses on the development and distribution of video games and interactive entertainment.'
  },
  {
    label: 'Healthcare',
    value: 'healthcare',
    description:
      'Involves medical services, pharmaceuticals, biotechnology, and health insurance, aimed at improving health outcomes.'
  },
  {
    label: 'Hospitality',
    value: 'hospitality',
    description:
      'Covers hotels, restaurants, and tourism services, focusing on customer service and guest experience.'
  },
  {
    label: 'Insurance',
    value: 'insurance',
    description:
      'Focuses on risk management and protection through various types of insurance policies and services.'
  },
  {
    label: 'Information Technology',
    value: 'information technology',
    description:
      'Covers software development, IT services, and emerging technologies driving digital transformation.'
  },
  {
    label: 'Internet of Things (IoT)',
    value: 'iot',
    description:
      'Encompasses interconnected devices and systems that communicate and exchange data over the internet.'
  },
  {
    label: 'Legal',
    value: 'legal',
    description:
      'Focuses on legal services, advice, and representation for individuals and businesses.'
  },
  {
    label: 'Logistics',
    value: 'logistics',
    description:
      'Covers the management of supply chains, transportation, warehousing, and distribution of goods.'
  },
  {
    label: 'Manufacturing',
    value: 'manufacturing',
    description:
      'Involves the production of goods through the transformation of raw materials into finished products.'
  },
  {
    label: 'Media & Entertainment',
    value: 'media & entertainment',
    description:
      'Includes the creation and distribution of content across various platforms, encompassing television, radio, film, and digital media.'
  },
  {
    label: 'Pharmaceuticals',
    value: 'pharmaceuticals',
    description:
      'Specializes in the development and production of drugs and medications to improve health outcomes.'
  },
  {
    label: 'Real Estate',
    value: 'real estate',
    description:
      'Encompasses property management, development, and investment in residential and commercial real estate.'
  },
  {
    label: 'Retail',
    value: 'retail',
    description:
      'Includes the sale of goods and services directly to consumers through various channels.'
  },
  {
    label: 'Sports',
    value: 'sports',
    description:
      'Focuses on sports management, events, and the sports industry, including broadcasting and promotion.'
  },
  {
    label: 'Telecommunications',
    value: 'telecommunications',
    description:
      'Encompasses the transmission of information over distances, including phone services, internet, and broadcasting.'
  },
  {
    label: 'Transportation',
    value: 'transportation',
    description:
      'Involves the movement of goods and people, covering various modes like road, rail, air, and sea.'
  },
  {
    label: 'Travel',
    value: 'travel',
    description:
      'Focuses on the industry surrounding travel and tourism, including hospitality, services, and experiences.'
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

export const defaultCreateOrganizationValues = {
  organizationName: 'Personal',
  organizationType: 'personal'
} as const;

export const FeatureInformation: Record<
  BusinessChangeKeys,
  (value?: string | Option[]) => string[]
> = {
  name: () => [
    "The name of your business is crucial for establishing brand recognition and recall. It's the first impression customers get of your brand, shaping their perception of your products or services.",
    "A strong business name should be memorable, unique, and reflective of your brand's values and identity. It sets the tone for your marketing efforts and helps you stand out in a crowded marketplace.",
    "Consider the emotional response you want to evoke in your target audience when choosing a name. Whether it's aspirational, descriptive, or whimsical, your business name should resonate with your target demographic and leave a lasting impression."
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
  ],

  description: () => [
    'A compelling business description is essential for articulating what sets your brand apart and why customers should choose you over competitors.',
    'Use your description to highlight your unique selling points, such as the quality of your products or services, your commitment to customer satisfaction, or your innovative approach to solving common problems.',
    'Think of your description as a sales pitch that communicates the value proposition of your business in a concise and engaging manner. Focus on the benefits customers will receive from choosing your brand, rather than just listing features.'
  ],

  logo: () => [
    "Your business image plays a key role in shaping how customers perceive your brand. It's a visual representation of your identity and values, conveying your brand personality and positioning in the market.",
    'A compelling business image should be eye-catching, professional, and aligned with your brand identity. It should capture the essence of your business and resonate with your target audience, creating a strong first impression that draws customers in.',
    "When selecting an image for your business, consider the emotions and associations you want to evoke in your customers. Whether it's trust, excitement, or sophistication, your image should reflect the values and qualities that set your brand apart from competitors."
  ],

  cover: () => [
    "Your business cover image is an opportunity to showcase your brand's personality and values in a visually engaging way. It's a powerful tool for creating a memorable first impression and setting the tone for your brand experience.",
    'A compelling cover image should be high-quality, relevant, and aligned with your brand identity. It should capture the essence of your business and communicate your unique selling points to customers, drawing them in and encouraging further exploration.',
    "When selecting a cover image for your business, consider the emotions and messages you want to convey. Whether it's professionalism, creativity, or warmth, your cover image should reflect the values and qualities that define your brand and resonate with your target audience."
  ],

  favicon: () => [
    "Your business favicon is a small but significant element of your brand identity. It's the tiny icon that appears in the browser tab when visitors access your website, helping them recognize and remember your brand.",
    'A well-designed favicon should be simple, distinctive, and reflective of your brand personality. It should be instantly recognizable and easy to distinguish from other icons, enhancing your brand visibility and recall.',
    "When creating a favicon for your business, focus on key elements of your brand identity, such as colors, shapes, or symbols. Keep it clean and uncluttered to ensure it's visible and legible even at small sizes, making it easy for users to identify your brand online."
  ]
};
