import { Slack } from '@trigger.dev/slack';
import { decodeJwt } from 'jose';

import { kinde } from '@/jobs/endpoints/kinde';
import { send } from '@/lib/sdks/sendgrid/send';
import { client } from '@/trigger';

const slack = new Slack({
  id: 'slack'
});

type KindeJWT = {
  type: 'user.created';
  timestamp: string;
  event_id: string;
  data: {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
};

export const kindeUserCreated = client.defineJob({
  version: '0.1.0',
  id: 'kinde-user-created',
  name: 'Kinde User Created',
  trigger: kinde.onRequest(),
  integrations: {
    slack
  },
  run: async (request, io) => {
    const body = await request.text();
    const jwt = decodeJwt<KindeJWT>(body);

    const { user } = jwt.data;
    const { email, first_name: name } = user;

    await send({
      email,
      templateKey: 'welcome',
      dynamicTemplateData: {
        name,
        company: 'Pulse'
      }
    });

    await io.slack.postMessage('kinde-user-created', {
      channel: 'C079M8K39L7',
      text: 'A new user has been created! 🎉',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'A new user has been created! 🎉'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Name: ${name}`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Email: ${email}`
          }
        }
      ]
    });
  }
});
