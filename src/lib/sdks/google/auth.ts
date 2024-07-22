import { google } from 'googleapis';

import { config } from '@/lib/sdks/google/config';

export const docs = google.docs({ version: 'v1' });
export const drive = google.drive({ version: 'v3' });
export const email = google.gmail({ version: 'v1' });
export const sheets = google.sheets({ version: 'v4' });

interface AuthConfig {
  email: string;
  key: string;
  scopes: string[];
}

export const createAuth = async () => {
  const jwtAuth = new google.auth.JWT(config.auth as AuthConfig);
  const googleAuth = new google.auth.GoogleAuth(config.auth);
  return { jwtAuth, googleAuth };
};

export const changeAuth = async (type: 'subject' | 'service') => {
  const { jwtAuth, googleAuth } = await createAuth();
  const auth = type === 'subject' ? jwtAuth : googleAuth;

  google.options({
    http2: true,
    auth
  });
};

void changeAuth('subject');
