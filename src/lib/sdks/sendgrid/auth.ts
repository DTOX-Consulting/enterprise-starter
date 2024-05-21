import sgMail from '@sendgrid/mail';

import { config } from '@/lib/sdks/sendgrid/config';

sgMail.setApiKey(config.auth.API_KEY);

export { sgMail };
