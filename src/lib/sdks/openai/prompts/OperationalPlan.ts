import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _OperationalPlan = `
Here are the sections needed:
- Tagline (10 words)
  A concise and impactful statement that encapsulates the core of your operational strategy.

- Executive Summary (250 words)
  An overview of the operational plan, highlighting the main objectives and strategies.

- Operations and Management (300 words)
  Detailed description of the operational processes and management structures in place.

- Financials (300 words)
  Analysis of the financial aspects, including budgeting, financial projections, and fiscal management.

- Funding and Investment (300 words)
  Overview of funding requirements, potential sources of investment, and strategies for securing financial support.

- Risk Analysis (400 words)
  Assessment of potential risks and challenges facing the business.
  - Risk Mitigation Plan
    Outline of strategies and measures to mitigate the identified risks.

- Milestones and Timelines (400 words)
  Description of key milestones and the timelines for achieving them.
  - Implementation Plan & Timeline
    A detailed schedule for the execution and implementation of the operational plan.

- Staffing Plan (500 words)
  Comprehensive plan for staffing, including recruitment and human resource management.
  - Include the minimal number of staff needed to run the business, detailing the roles and responsibilities of each staff member.
  - Include salary information for each role.
  - Include the hiring timeline and the preferred order of hiring.
`.trim();

export const OperationalPlan = documentGenerationPrefixReplacer(
  'operational-business-plan',
  _OperationalPlan
);
