import { createSchema } from '@/lib/db/rxdb/utils/schema';

export type Notification = {
  image?: string;
  icon?: 'Sparkles';
  content: {
    actor?: string;
    action?: string;
    actorImage?: string;
  };
  readAt?: string;
  removedAt?: string;
  meta?: {
    [key: string]: unknown;
  };
};

export const notificationSchema = createSchema<Notification>({
  version: 0,
  title: 'notification schema',
  description: 'describes a notification',
  required: ['content'],
  properties: {
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
      properties: {
        suggestion: {
          type: 'object',
          properties: {
            businessId: {
              type: 'string'
            },
            organizationId: {
              type: 'string'
            },
            similarity: {
              type: 'object',
              properties: {
                value: {
                  type: 'number'
                },
                label: {
                  type: 'string'
                }
              }
            },
            key: {
              type: 'string'
            },
            current: {
              type: ['string', 'array'],
              items: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string'
                  },
                  label: {
                    type: 'string'
                  }
                }
              }
            },
            updated: {
              type: ['string', 'array'],
              items: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string'
                  },
                  label: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});
