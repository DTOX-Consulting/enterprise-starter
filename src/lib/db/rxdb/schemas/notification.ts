import { createSchema } from '@/lib/db/rxdb/utils/schema';

import type { Similarity } from '@/app/(authenticated)/businesses/utils/formatters';
import type { Option } from '@/components/ui/atoms/select-multi';
import type { BusinessChangeKeys } from '@/data/guards';

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
  meta?: {
    suggestion?: {
      businessId: string;
      organizationId: string;
      similarity: Similarity;
      key: BusinessChangeKeys;
      current: string | Option[];
      updated: string | Option[];
    };
  };
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
