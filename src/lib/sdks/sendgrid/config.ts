import { getEnv } from '@/lib/env';

export const config = {
  auth: {
    API_KEY: getEnv('SENDGRID_API_KEY')
  },
  emails: {
    hal: { name: 'HAL AI', email: 'hal@bpeneur.com' },
    hal2: { name: 'HAL AI', email: 'hal@bpeneur.co.uk' },
    hal3: { name: 'HAL AI', email: 'hal@mk-bpeneur.com' },
    noreply3: { name: 'No Reply', email: 'no-reply@mk-bpeneur.com' }
  }
};
