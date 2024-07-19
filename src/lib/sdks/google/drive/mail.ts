import { fromPromise } from '@/lib/route/utils';
import { email } from '@/lib/sdks/google/auth';
import { config } from '@/lib/sdks/google/config';

export type SendArgs = {
  to: string;
  body: string;
  from?: string;
  subject: string;
};

export const sendMail = async ({ body, subject, to, from = config.auth.subject }: SendArgs) => {
  try {
    const response = await email.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(
          [
            'Content-Type: text/html; charset="UTF-8"\n',
            'Content-Transfer-Encoding: 7bit\n',
            'MIME-Version: 1.0\n',
            `to: ${to}\n`,
            `from: ${from}\n`,
            `subject: ${subject}\n\n`,
            body
          ].join('')
        ).toString('base64')
      }
    });

    return fromPromise(Promise.resolve(response.data));
  } catch (error) {
    // Handle or throw the error as needed
    throw error;
  }
};
