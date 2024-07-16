import { devEmail, noReplyEmail } from '@/app/metadata';
import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    API_KEY: getEnv('SENDGRID_API_KEY')
  },
  emails: {
    dev: { name: 'Dev', email: devEmail },
    noreply: { name: 'No Reply', email: noReplyEmail }
  },
  templates: {
    welcome: {
      id: 'd-6f40b4760fdd4ff28cce7b474a16e124',
      data: {
        name: 'string',
        company: 'string'
      }
    },
    emailVerification: {
      id: 'd-6f40b4760fdd4ff28cce7b474a16e124',
      data: {
        name: 'string',
        company: 'string'
      }
    }
  }
};
