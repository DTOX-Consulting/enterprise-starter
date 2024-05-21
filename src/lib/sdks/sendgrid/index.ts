import { fromPromise } from '@/lib/route/utils';
import { sgMail } from '@/lib/sdks/sendgrid/auth';
import { config } from '@/lib/sdks/sendgrid/config';

export type EmailJSON = { name?: string; email: string };

export type SendArgs = {
  to: string;
  body: string;
  subject: string;
  from?: string | EmailJSON;
};

export const sendMail = async ({ body, subject, to, from = config.emails.hal2 }: SendArgs) => {
  return fromPromise(
    sgMail.send({
      to,
      from,
      subject,
      html: body,
      replyTo: from,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        }
      }
    })
  );
};
