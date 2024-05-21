import type { TemplateOverrides } from '@/lib/sdks/openai/templates/types';

export const templateOverrides: TemplateOverrides = {
  writer: {
    tone: 'friendly',
    persona: 'generalPublic'
  },
  writerShort: {
    tone: 'friendly',
    persona: 'generalPublic'
  },
  twitter: {
    tone: 'engaging',
    persona: 'generalPublic'
  },
  instagram: {
    tone: 'engaging',
    persona: 'generalPublic'
  },
  linkedin: {
    tone: 'engaging',
    persona: 'generalPublic'
  },
  email: {
    tone: 'assertive',
    persona: 'customer'
  },
  customerSupport: {
    tone: 'friendly',
    persona: 'customer'
  },
  businessConsultant: {
    tone: 'professional',
    persona: 'generalPublic'
  },
  code: {
    tone: 'academic',
    format: 'codeTypescript',
    persona: 'softwareDeveloperOrITConsultant'
  },
  image: {
    tone: 'engaging',
    format: 'markdown',
    persona: 'generalPublic'
  },
  learn: {
    tone: 'academic',
    format: 'markdown',
    persona: 'generalPublic'
  },
  rewriter: {
    tone: 'engaging',
    format: 'markdown',
    persona: 'generalPublic'
  },
  blogPost: {
    model: 'gpt4',
    tone: 'engaging',
    format: 'markdown',
    persona: 'generalPublic'
  },
  newsLetter: {
    model: 'gpt4',
    tone: 'engaging',
    format: 'markdown',
    persona: 'generalPublic'
  },
  pitchDeck: {
    model: 'gpt4',
    tone: 'professional',
    format: 'markdown',
    persona: 'investor'
  },
  pressReleaseProduct: {
    model: 'gpt4',
    tone: 'professional',
    format: 'markdown',
    persona: 'generalPublic'
  }
};
