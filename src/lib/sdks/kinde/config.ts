import { getEnv } from '@/lib/env';

export const config = {
  defaultOrgCode: 'org_a1de411b6d8',
  auth: {
    clientId: getEnv('KINDE_CLIENT_ID'),
    authDomain: getEnv('KINDE_ISSUER_URL'),
    clientSecret: getEnv('KINDE_CLIENT_SECRET'),
    audience: `${getEnv('KINDE_ISSUER_URL')}/api`,
    redirectURL: getEnv('KINDE_POST_LOGIN_REDIRECT_URL'),
    logoutRedirectURL: getEnv('KINDE_POST_LOGOUT_REDIRECT_URL')
  }
};
