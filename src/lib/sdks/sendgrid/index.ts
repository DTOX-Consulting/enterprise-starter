import { G } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';

import { sgMail } from '@/lib/sdks/sendgrid/auth';
import { config } from '@/lib/sdks/sendgrid/config';

import type { MailDataRequired } from '@sendgrid/mail';

export type EmailJSON = { name?: string; email: string };

export type SendArgs = {
  to: string;
  body?: string;
  subject?: string;
  templateId?: string;
  from?: string | EmailJSON;
  dynamicTemplateData?: Record<string, string>;
};

export const sendMail = async ({
  to,
  body,
  subject,
  templateId,
  dynamicTemplateData,
  from = config.emails.noreply
}: SendArgs) => {
  if (G.isNullable(body) || G.isNullable(templateId)) {
    throw new Error('Missing body or templateId');
  }

  const msg = {
    to,
    from,
    subject,
    html: body,
    templateId,
    replyTo: from,
    hideWarnings: true,
    dynamicTemplateData,
    trackingSettings: {
      clickTracking: {
        enable: true
      },
      openTracking: {
        enable: true
      }
    }
  } as MailDataRequired;

  if (!G.isNotNullable(body)) {
    Reflect.deleteProperty(msg, 'html');
  }

  if (!G.isNotNullable(templateId)) {
    Reflect.deleteProperty(msg, 'templateId');
    Reflect.deleteProperty(msg, 'dynamicTemplateData');
  }

  return unbox(sgMail.send(msg));
};
