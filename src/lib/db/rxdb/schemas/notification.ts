import { createSchema } from '@/lib/db/rxdb/utils/schema';

export type Notification = {
  image?: string;
  ownerId: string;
  icon?: 'Sparkles';
  content: {
    actor?: string;
    action?: string;
    actorImage?: string;
  };
  readAt?: string;
  removedAt?: string;
  meta?: Record<string, unknown>;
};

export const notificationSchema = createSchema<Notification>({
  title: 'notification schema',
  description: 'describes a notification',
  indexes: ['ownerId'],
  required: ['ownerId', 'content'],
  properties: {
    ownerId: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    icon: {
      type: 'string'
    },
    content: {
      type: 'object',
      properties: {
        actor: {
          type: 'string'
        },
        action: {
          type: 'string'
        },
        actorImage: {
          type: 'string'
        }
      }
    },
    readAt: {
      type: 'string'
    },
    removedAt: {
      type: 'string'
    },
    meta: {
      type: 'object',
      properties: {}
    }
  }
});
