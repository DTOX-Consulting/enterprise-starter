import { createSchema } from '@/lib/db/rxdb/utils/schema';

export type UserMeta = {
  hasAcceptedTerms: boolean;
  journeyState: Record<string, Record<string, unknown>>;
  lastVisited?: {
    businessId?: string;
    organizationId?: string;
  };
  editingState?:
    | {
        feature: string;
        businessId: string;
        organizationId: string;
      }
    | Record<string, never>;
}

export const userMetaSchema = createSchema<UserMeta>({
  version: 0,
  title: 'user meta schema',
  description: 'describes the user meta data',
  indexes: [],
  required: ['hasAcceptedTerms', 'journeyState', 'editingState'],
  properties: {
    hasAcceptedTerms: {
      type: 'boolean'
    },
    lastVisited: {
      oneOf: [
        {
          type: 'null'
        },
        {
          type: 'object',
          properties: {
            businessId: {
              type: 'string'
            },
            organizationId: {
              type: 'string'
            }
          }
        }
      ]
    },
    journeyState: {
      type: 'object',
      properties: {
        key: {
          type: 'object',
          properties: {},
          additionalProperties: {
            type: ['string', 'number', 'boolean', 'object', 'array']
          }
        }
      }
    },
    editingState: {
      type: 'object',
      properties: {
        feature: {
          type: 'string'
        },
        businessId: {
          type: 'string'
        },
        organizationId: {
          type: 'string'
        }
      }
    }
  }
});
