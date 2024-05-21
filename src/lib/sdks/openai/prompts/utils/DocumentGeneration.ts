import { BusinessConsultant } from '@/lib/sdks/openai/prompts/BusinessConsultant';
import { replace } from '@/lib/sdks/openai/prompts/utils/replacer';

export const DocumentGeneration = `
I'm a startup founder aiming to launch a new business, but I'm starting from scratch in terms of business knowledge.
I'm seeking your expertise to help me create a robust {{name}} tailored to my startup.
As an expert in {{name}}s, you will craft a {{name}} tailored to my startup.
Replace "Company Name" with my actual company name. No need for explanations.
Only "{{title}} for [Company Name]" title is added, no other intros.
You must always start with "{{title}} for [Company Name]" as the title.
`.trim();

const postPrompt = `
Never repeat sections or the whole document
Do NOT say "Note: The word count for each section has been adhered to as per the specifications provided." or anything similar.
Do not give generic advice or explanations or advice. Be specific to the company and give exact answers for each section.
If specified, always use the specified word count for each section.
Always have the section title and word count beside each section followed by a colon. i.e "Tagline (10 words):".
Always have the section body on the next line after the section title and word count. i.e. "Tagline (10 words):\nThis is the tagline for the company."
`.trim();

export const documentGenerationPrefixReplacer = (type: string, prompt: string) => {
  const replacedDocument = replace({ type, prompt }, DocumentGeneration);
  return [BusinessConsultant, replacedDocument, prompt, postPrompt].join('\n\n').trim();
};
