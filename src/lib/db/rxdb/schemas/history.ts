import { createSchema } from '@/lib/db/rxdb/utils/schema';

import type { Option } from '@/components/ui/atoms/select-multi';
import type { BusinessChangeKeys } from '@/data/guards';

export interface History {
  ownerId: string;
  businessId: string;
  organizationId: string;
  description?: string;
  key: BusinessChangeKeys;
  value: {
    data: string | Option[];
  };
}

export type HistoryFilters = {
  date?: string;
  keys?: BusinessChangeKeys[];
};

export const historySchema = createSchema<History>({
  title: 'history schema',
  description: 'describes a history item',
  indexes: ['ownerId', 'businessId', 'organizationId'],
  required: ['ownerId', 'businessId', 'organizationId', 'key', 'value'],
  properties: {
    ownerId: {
      type: 'string'
    },
    businessId: {
      type: 'string'
    },
    organizationId: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    key: {
      type: 'string'
    },
    value: {
      type: 'object',
      properties: {
        data: {
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
});
