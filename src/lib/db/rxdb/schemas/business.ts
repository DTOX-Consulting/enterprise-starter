import { createSchema } from '@/lib/db/rxdb/utils/schema';

import type { BusinessChangeKeys } from '@/data/guards';
import type { Option } from '@/data/option';
import type { DeepReadonly } from '@/lib/utils/object';

export interface CompanyStatements {
  name: string;
  vision: string;
  mission: string;
  problem: string;
  tagline: string;
  description: string;
  industry: Option[];
}

export interface Business {
  name: string;
  image: string;
  ownerId: string;
  organizationId: string;
  description: string;
  data: {
    vision: string;
    mission: string;
    problem: string;
    tagline: string;
    industry: Option[];
  };
  meta?: {
    image?: {
      tag?: string;
      page?: number;
      color?: string;
      searchText?: string;
    };
    provideSuggestions?: ProvideSuggestions;
  };
}

export type ProvideSuggestions = Record<BusinessChangeKeys, boolean>;
export type ReadOnlyProvideSuggestions = DeepReadonly<ProvideSuggestions>;

export const businessSchema = createSchema<Business>({
  title: 'business schema',
  description: 'describes a business',
  indexes: ['ownerId', 'organizationId'],
  required: ['ownerId', 'organizationId', 'name', 'image', 'description', 'data'],
  properties: {
    ownerId: {
      type: 'string'
    },
    organizationId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    data: {
      type: 'object',
      properties: {
        vision: {
          type: 'string'
        },
        mission: {
          type: 'string'
        },
        problem: {
          type: 'string'
        },
        tagline: {
          type: 'string'
        },
        industry: {
          type: 'array',
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
    },
    meta: {
      type: 'object',
      properties: {
        image: {
          type: 'object',
          properties: {
            tag: {
              type: 'string'
            },
            page: {
              type: 'number'
            },
            color: {
              type: 'string'
            },
            searchText: {
              type: 'string'
            }
          }
        },
        provideSuggestions: {
          type: 'object',
          properties: {
            name: {
              type: 'boolean'
            },
            image: {
              type: 'boolean'
            },
            description: {
              type: 'boolean'
            },
            vision: {
              type: 'boolean'
            },
            mission: {
              type: 'boolean'
            },
            problem: {
              type: 'boolean'
            },
            tagline: {
              type: 'boolean'
            },
            industry: {
              type: 'boolean'
            }
          }
        }
      }
    }
  }
});
