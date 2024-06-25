import { getEnv } from '@/lib/env';

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/spreadsheets'
];

export const config = {
  email: {
    serviceAccount: 'ai-apps@ai-apps-397116.iam.gserviceaccount.com"'
  },
  drive: {
    fields: {
      permission: 'id,role,type,emailAddress',
      permissions: 'permissions(id,role,type,emailAddress)',
      files: 'id,name,webViewLink,webContentLink,permissions,owners,mimeType',
      folders: 'files(id,name,webViewLink,webContentLink,permissions,owners,mimeType)'
    },
    directories: {
      main: {
        name: 'AI Apps',
        path: 'AI Apps',
        id: '1hS6SxhIlBukHJxywHcGMshPEnDK5HpDs',
        parents: []
      },
      public: {
        name: 'Public',
        path: 'AI Apps/Public',
        id: '1sXsklHnHO7ydQWABTZFeq0gVpkFovRZj',
        parents: ['1hS6SxhIlBukHJxywHcGMshPEnDK5HpDs']
      }
    }
  },
  auth: {
    scopes,
    subject: getEnv('GOOGLE_CLIENT_SUBJECT'),
    key: getEnv('GOOGLE_PRIVATE_KEY'),
    email: getEnv('GOOGLE_CLIENT_EMAIL'),
    projectId: getEnv('GOOGLE_PROJECT_ID'),
    credentials: {
      private_key: getEnv('GOOGLE_PRIVATE_KEY'),
      client_email: getEnv('GOOGLE_CLIENT_EMAIL')
    }
  }
};
