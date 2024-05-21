import { devEmail, noReplyEmail } from '@/app/metadata';
import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    API_KEY: getEnv('SENDGRID_API_KEY')
  },
  emails: {
    dev: { name: 'Dev', email: devEmail },
    noreply: { name: 'No Reply', email: noReplyEmail }
  }
};
