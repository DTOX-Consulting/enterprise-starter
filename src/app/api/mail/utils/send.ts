import { R } from '@mobily/ts-belt';

import { devEmail } from '@/app/metadata';
import { getEnv } from '@/lib/env';
import { logger } from '@/lib/logger';
import { sendMail } from '@/lib/sdks/sendgrid';

export type SendArgs = {
  body: string;
  email: string;
  subject: string;
};

export const send = async ({ email, subject, body }: SendArgs) => {
  const to = getEnv('VERCEL_ENV') === 'development' ? devEmail : email;

  logger.info({ to, subject }, 'Sending Email');

  if (!to || !body) {
    throw new Error('Missing email or body');
  }

  const _emailResponse = await sendMail({ to, subject, body });
  const emailResponse = R.isOk(_emailResponse)
    ? R.getExn(_emailResponse)
    : R.getExn(R.flip(_emailResponse));

  logger.info({ emailResponse: emailResponse as any }, 'Email Sent');

  if (!R.isOk(_emailResponse)) {
    console.error('Email failed to send', emailResponse);
    throw new Error('Email failed to send');
  }

  return emailResponse;
};
