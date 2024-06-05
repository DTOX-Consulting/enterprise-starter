import { R } from '@mobily/ts-belt';
import { unbox } from 'unbox-js';
import { z } from 'zod';

import { devEmail } from '@/app/metadata';
import { getEnv } from '@/lib/env';
import { logger } from '@/lib/logger';
import { unboxR } from '@/lib/route/utils';
import { sendMail } from '@/lib/sdks/sendgrid';
import { publicProcedure } from '@/trpc';

import type { GenericObject } from '@/lib/utils/object';

export const mailRouter = {
  mail: publicProcedure
    .input(
      z.object({
        body: z.string(),
        email: z.string(),
        subject: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { email, subject, body } = input;
      const { error } = await unbox(send({ email, subject, body }));

      return {
        success: !error,
        error
      };
    })
};

type SendArgs = {
  body: string;
  email: string;
  subject: string;
};

const send = async ({ email, subject, body }: SendArgs) => {
  const to = getEnv('VERCEL_ENV') === 'development' ? devEmail : email;

  logger.info({ to, subject }, 'Sending Email');

  if (!to || !body) {
    throw new Error('Missing email or body');
  }

  const _emailResponse = await sendMail({ to, subject, body });
  const emailResponse = unboxR(_emailResponse);

  logger.info({ emailResponse: emailResponse as GenericObject }, 'Email Sent');

  if (!R.isOk(_emailResponse)) {
    throw new Error('Email failed to send');
  }

  return emailResponse;
};

export const generateEmailBody = (
  emailContent: string,
  {
    url,
    documentBody,
    documentTitle
  }: {
    url: string;
    documentBody: string;
    documentTitle: string;
  }
) => {
  return emailContent
    .replace(/{{ \$url }}/gim, url)
    .replace(/{{ \$documentBody }}/gim, documentBody)
    .replace(/{{ \$documentTitle }}/gim, documentTitle);
};
