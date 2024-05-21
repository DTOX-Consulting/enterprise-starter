import { documentGenerationPrefixReplacer } from '@/lib/sdks/openai/prompts/utils/DocumentGeneration';

const _CompanyBylaws = `
Here are the sections needed:
- Tagline (10 words)
  A succinct phrase encapsulating the governance ethos of Your Company.

- Introduction (100 words)
  Explain the purpose of the bylaws.
  Emphasize their role in governing the internal management and operations of Your Company.

- Name and Purpose of the Corporation (150 words)
  State the official name of Your Company.
  Outline the corporation's purpose as defined in the Articles of Incorporation.

- Board of Directors (250 words)
  Define the composition and powers of the Board of Directors.
  Detail the process for electing and removing directors.
  Outline the frequency and procedures for board meetings.
  Describe the roles and responsibilities of board members.

- Officers (200 words)
  List the required officers (e.g., President, Secretary, Treasurer).
  Specify the process for electing or appointing officers.
  Describe the duties and powers of each officer.

- Shareholder Meetings (200 words)
  Establish procedures for annual shareholder meetings.
  Include guidelines for calling special meetings, notice requirements, quorum, voting methods, and proxy voting.

- Committees (150 words)
  Detail the creation and authority of committees, such as an executive committee or audit committee.
  Specify how committee members are appointed.

- Corporate Records and Reports (150 words)
  Outline the requirements for maintaining corporate records, such as meeting minutes and financial reports.
  Specify the process for making these records available to shareholders.

- Fiscal Year (100 words)
  Define the fiscal year for Your Company.

- Amendments (150 words)
  Establish the procedures for amending the bylaws, including who can propose amendments and the required voting process.

- Conflict of Interest Policy (200 words)
  Include a policy to address conflicts of interest among board members and officers.

- Indemnification (150 words)
  Provide provisions for the indemnification of directors, officers, employees, and agents.

- Conclusion (100 words)
  Conclude with a statement affirming the adoption of the bylaws and their importance in the effective governance of Your Company.
`.trim();

export const CompanyBylaws = documentGenerationPrefixReplacer('company-bylaws', _CompanyBylaws);
