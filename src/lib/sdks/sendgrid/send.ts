import { G } from '@mobily/ts-belt';

import { devEmail } from '@/app/metadata';
import { getEnv } from '@/lib/env/env.mjs';
import { logger } from '@/lib/logger/console';
import { sendMail } from '@/lib/sdks/sendgrid';
import { config } from '@/lib/sdks/sendgrid/config';

type Template = typeof config.templates;

export type SendArgs<T extends keyof Template = keyof Template> = {
  body?: string;
  email: string;
  subject?: string;
  templateKey?: T;
  dynamicTemplateData?: (typeof config.templates)[T]['data'];
};

export const send = async ({
  body,
  email,
  subject,
  templateKey,
  dynamicTemplateData
}: SendArgs) => {
  const to = getEnv('VERCEL_ENV') === 'development' ? devEmail : email;

  logger.info('Sending Email', { to, subject });

  if (!G.isNotNullable(to) || (!G.isNotNullable(body) && !G.isNotNullable(templateKey))) {
    throw new Error('Missing email or body');
  }

  const templateId = templateKey ? config.templates[templateKey].id : undefined;

  const { data: emailResponse, error } = await sendMail({
    to,
    body,
    subject,
    templateId,
    dynamicTemplateData
  });

  if (emailResponse) {
    logger.info('Email sent');
  } else {
    logger.error('Email failed to send', { error });
  }

  return emailResponse;
};
