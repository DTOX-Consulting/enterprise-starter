export type PersonaType = keyof typeof Personas;
export type MinimalPersonaType = keyof typeof MinimalPersonas;

export const Personas = {
  affiliateMarketer:
    'The persona is of an affiliate marketer. Individuals or businesses promoting your products or services in exchange for a commission. Communication focuses on affiliate programs, marketing materials, and commission payments.',

  angelInvestor:
    'The persona is of an angel investor. Individuals who provide financial support to startups in exchange for equity or ownership stakes. Communication should focus on presenting your business as an attractive investment opportunity.',

  bankerFinancialAdvisor:
    'The persona is of a banker/financial advisor. Professionals offering financial services, loans, or advice. Communication should relate to financial transactions, loans, or investment strategies.',

  brandAmbassador:
    'The persona is of a brand ambassador. Individuals who represent and promote your brand, often through endorsements and partnerships. Communication may involve collaboration and promotional content.',

  businessAnalyst:
    'The persona is of a business analyst. Professionals who analyze data and provide insights to help improve business processes and decision-making. Communication should relate to data analysis and business improvement.',

  businessConsultant:
    'The persona is of a business consultant. Professionals who provide expert advice on various aspects of business strategy and management. Communication may involve consulting services and strategic planning.',

  charityOrganizationRepresentative:
    'The persona is of a charity/organization representative. Representatives from charitable organizations or non-profits interested in partnerships or support from your business. Communication may involve collaboration and philanthropic efforts.',

  communityModerator:
    'The persona is of a community/group moderator. Leaders or administrators of online forums, groups, or communities related to your industry. Communication should involve community engagement and partnership opportunities.',

  competitor:
    'The persona is of a competitor. Other businesses in your industry or niche, with whom you may engage in indirect or collaborative interactions. Communication might involve industry insights or partnership discussions.',

  customer:
    'The persona is of a customer. Individuals or businesses who have purchased or shown interest in your product or service. Your communication should focus on providing support, addressing inquiries, and ensuring customer satisfaction.',

  customerSupportRepresentative:
    'The persona is of a customer support representative. Professionals who provide customer service and assistance to resolve customer issues or inquiries. Communication should involve addressing customer concerns and providing solutions.',

  distributorReseller:
    'The persona is of a distributor/reseller. Entities responsible for distributing or reselling your product or service. Your communication should focus on distribution agreements, orders, and maintaining a productive relationship.',

  employee:
    'The persona is of an employee. Individuals who work for your business. Communication should be professional and relate to employee-related matters, such as payroll, benefits, and performance reviews.',

  endorserInfluencer:
    'The persona is of an endorser/influencer. Prominent individuals in your industry or on social media platforms who promote your product or service. Communication may involve collaboration and promotional content.',

  eventOrganizer:
    'The persona is of an event organizer. Individuals or companies organizing events, workshops, or conferences relevant to your industry. Communication may include participation, sponsorship, or presentation proposals.',

  feedbackReviewer:
    'The persona is of a feedback reviewer. Individuals or entities providing feedback on your products, services, or business operations. Communication may involve addressing feedback and implementing improvements.',

  freelancerContractor:
    'The persona is of a freelancer/contractor. Individuals or agencies providing specialized services or skills on a project basis. Your communication should involve project scope, deadlines, and deliverables.',

  franchisee:
    'The persona is of a franchisee. Individuals who own and operate franchises of your business. Communication may involve franchise agreements, support, and business operations.',

  governmentGrantOfficer:
    'The persona is of a government grant officer. Representatives from government agencies responsible for providing grants or funding opportunities to businesses. Communication should address grant applications and compliance.',

  generalPublic:
    'The persona is of the general public. Individuals who are not directly involved with your business. Communication should be clear and concise, and avoid using jargon or technical terms.',

  hr: 'The persona is of an HR (Human Resources) professional. Human Resources professionals responsible for various aspects of employee management, such as recruitment, payroll, and benefits. Your communication should be professional and relate to HR-related matters.',

  industryAssociationRepresentative:
    'The persona is of an industry association representative. Representatives from industry associations or trade organizations related to your business. Communication may involve memberships, partnerships, and industry initiatives.',

  insuranceAgent:
    'The persona is of an insurance agent. Professionals who provide insurance products or services. Communication may involve insurance policies, coverage, and risk management.',

  intellectualPropertyAttorney:
    'The persona is of an intellectual property attorney. Legal professionals specializing in intellectual property law. Communication may involve trademark, copyright, or patent matters.',

  investor:
    'The persona is of an investor. Individuals or institutions providing financial support to your business in exchange for equity or financial returns. Your communication should focus on presenting your business as an attractive investment opportunity.',

  jointVenturePartner:
    'The persona is of a joint venture partner. Businesses or individuals with whom you have a collaborative business venture. Communication should revolve around joint ventures and mutual growth opportunities.',

  legalCounsel:
    'The persona is of a legal counsel. Lawyers or legal firms assisting with contracts, intellectual property, or other legal matters related to your business. Communication may involve legal consultations or contract negotiations.',

  licensingAgent:
    'The persona is of a licensing agent. Professionals who facilitate licensing agreements for your intellectual property or products. Communication may involve licensing terms and agreements.',

  localBusinessOwner:
    'The persona is of a local business owner. Individuals who own and operate local businesses. Communication may involve partnerships, collaborations, or support for local businesses.',

  manufacturer:
    'The persona is of a manufacturer. Entities responsible for producing physical products or goods. Communication may involve manufacturing agreements, product specifications, and quality control.',

  marketingAgencyRepresentative:
    'The persona is of a marketing agency representative. Professionals from marketing agencies providing marketing and advertising services. Communication may involve marketing strategies and campaigns.',

  mentorAdvisor:
    'The persona is of a mentor/advisor. Experienced individuals providing guidance and expertise to help your business navigate challenges and make informed decisions.',

  nonProfitOrganizationLeader:
    'The persona is of a non-profit organization leader. Leaders of non-profit organizations focused on various causes. Communication may involve partnerships, support, and charitable efforts.',

  partner:
    'The persona is of a partner. Other businesses or individuals with whom you have a strategic alliance or partnership. Your communication should revolve around collaboration, joint ventures, and mutual growth opportunities.',

  pressOfficer:
    'The persona is of a press officer. Representatives from media outlets or your company’s public relations team. Your communication should aim to provide accurate and engaging information for press releases and media coverage.',

  productTester:
    'The persona is of a product tester. Individuals or entities responsible for testing and providing feedback on your products or services. Communication may involve product testing processes and feedback collection.',

  prospect:
    'The persona is of a prospect. Prospective clients or customers who might be interested in your product or service. Your communication with them should focus on highlighting the value and benefits your offering provides.',

  realEstateAgentBroker:
    'The persona is of a real estate agent/broker. Professionals in the real estate industry who may assist startups needing physical locations. Communication may involve property acquisition or leasing.',

  recruiterHeadhunter:
    'The persona is of a recruiter/headhunter. Professionals who specialize in recruiting talent for your business. Communication may involve job openings, candidate evaluations, and hiring processes.',

  regulatoryGovernmentOfficials:
    'The persona is of regulatory/government officials. Representatives from government agencies overseeing regulations relevant to your business. Your communication should address compliance, reporting, and regulatory concerns.',

  researcherAcademic:
    'The persona is of a researcher/academic. Individuals from educational institutions or research bodies interested in your business for academic purposes. Communication may involve research collaborations or data sharing.',

  retailer:
    'The persona is of a retailer. Businesses or individuals who sell your products directly to consumers. Communication may involve retail agreements, orders, and inventory management.',

  salesRepresentative:
    'The persona is of a sales representative. Professionals responsible for sales and business development. Communication should focus on sales strategies, partnerships, and revenue growth.',

  softwareDeveloperOrITConsultant:
    'The persona is of a software developer/IT consultant. Professionals specializing in software development or IT consulting services. Communication may involve project scope, technical specifications, and software solutions.',

  supplierVendor:
    'The persona is of a supplier/vendor. Entities supplying products or services essential to your business operations. Your communication should involve procurement, orders, and maintaining a positive supplier relationship.',

  taxAdvisorAccountant:
    'The persona is of a tax advisor/accountant. Professionals providing tax advice and accounting services. Communication may involve tax planning, financial statements, and compliance.',

  technicalSupportSpecialist:
    'The persona is of a technical support specialist. Professionals who provide technical support and assistance to resolve technical issues or inquiries. Communication should involve addressing technical concerns and providing solutions.',

  tradeShowOrganizer:
    'The persona is of a trade show organizer. Individuals or companies organizing trade shows or exhibitions relevant to your industry. Communication may include participation, sponsorship, or booth arrangements.',

  trainingDevelopmentSpecialist:
    'The persona is of a training & development specialist. Professionals responsible for training and skill development programs. Communication may involve training content, curriculum, and employee development.',

  ventureCapitalist:
    'The persona is of a venture capitalist. Individuals or institutions providing venture capital funding to startups in exchange for equity. Communication should focus on presenting your business as an attractive investment opportunity.',

  webDesignerDeveloper:
    'The persona is of a web designer/developer. Professionals specializing in web design and development services. Communication may involve website projects, design specifications, and technical solutions.',

  wholesalePartner:
    'The persona is of a wholesale partner. Businesses or entities with whom you have a wholesale partnership for bulk product purchasing and distribution. Communication should focus on wholesale agreements and orders.'
} as const;

const minmalPersonaKeys = [
  'competitor',
  'customer',
  'customerSupportRepresentative',
  'employee',
  'generalPublic',
  'investor',
  'marketingAgencyRepresentative',
  'mentorAdvisor',
  'partner',
  'softwareDeveloperOrITConsultant',
  'ventureCapitalist'
] as const;

export const MinimalPersonas = minmalPersonaKeys.reduce(
  (acc, persona) => {
    acc[persona] = Personas[persona];
    return acc;
  },
  {} as Record<(typeof minmalPersonaKeys)[number], string>
);
