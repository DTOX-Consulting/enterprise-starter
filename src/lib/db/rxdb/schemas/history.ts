import { createSchema } from '@/lib/db/rxdb/utils/schema';

import type { Option } from '@/components/ui/atoms/select-multi';
import type { BusinessChangeKeys } from '@/data/guards';

export type History = {
  businessId: string;
  organizationId: string;
  description?: string;
  key: BusinessChangeKeys;
  value: {
    score?: number;
    data: string | Option[];
  };
};

export type HistoryFilters = {
  date?: string;
  keys?: BusinessChangeKeys[];
};

export const historySchema = createSchema<History>({
  version: 1,
  title: 'history schema',
  description: 'describes a history item',
  indexes: ['businessId', 'organizationId'],
  required: ['businessId', 'organizationId', 'key', 'value'],
  properties: {
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
        score: {
          type: 'number'
        },
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
