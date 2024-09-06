import {
  businessChangeKeys,
  businessChangeSLImagesKeys,
  type BusinessChangeKeys,
  type BusinessChangeSLImagesKeys
} from '@/data/guards';
import { createSchema, type NCS } from '@/lib/db/rxdb/utils/schema';
import { slugify } from '@/lib/utils/id';

import type { Option } from '@/data/option';
import type { DeepReadonly } from '@/lib/utils/object';
import type { JsonSchema } from 'rxdb';

export type Score = {
  score: number;
  title: string;
  weight: number;
  body: string[];
};

export type Image = {
  tag: string;
  page: number;
  color: string;
  searchText: string;
};

export type CompanyStatements = {
  name: string;
  vision: string;
  mission: string;
  problem: string;
  tagline: string;
  description: string;
  industry: Option[];
};

export type Business = {
  image: null;
  description: null;
  name: string;
  slug: string;
  organizationId: string;
  data: {
    core: {
      vision: string;
      mission: string;
      problem: string;
      tagline: string;
      industry: Option[];
      description: string;
    };
    images: {
      logo: string;
      cover: string;
      favicon: string;
    };
  };
  meta?: {
    images?: Images;
    scores?: Scores;
    provideSuggestions?: ProvideSuggestions;
  };
};

export type ReadOnlyScore = DeepReadonly<Score[]>;
export type ReadOnlyScores = DeepReadonly<Scores>;
export type Scores = Record<BusinessChangeKeys, Score[]>;

export type Images = Record<BusinessChangeSLImagesKeys, Image>;
export type ReadOnlyImages = DeepReadonly<Images>;
export type ReadOnlyImage = DeepReadonly<Image>;

export type ProvideSuggestions = Record<BusinessChangeKeys, boolean>;
export type ReadOnlyProvideSuggestions = DeepReadonly<ProvideSuggestions>;

export type BusinessImages = Record<BusinessChangeSLImagesKeys, string | undefined>;

export function companyStatementsToBusiness({
  images,
  companyStatements,
  organizationId = '',
  provideSuggestions = false
}: {
  images?: BusinessImages;
  organizationId?: string;
  provideSuggestions: boolean;
  companyStatements: CompanyStatements;
}) {
  const business: NCS<Business> = {
    image: null,
    description: null,
    organizationId,
    name: companyStatements.name,
    slug: slugify(companyStatements.name),
    data: {
      core: {
        vision: companyStatements.vision,
        mission: companyStatements.mission,
        problem: companyStatements.problem,
        tagline: companyStatements.tagline,
        industry: companyStatements.industry,
        description: companyStatements.description
      },
      images: {
        logo: images?.logo ?? '',
        cover: images?.cover ?? '',
        favicon: images?.favicon ?? ''
      }
    },
    meta: {
      provideSuggestions: businessChangeKeys.reduce((acc, key) => {
        acc[key] = provideSuggestions;
        return acc;
      }, {} as ProvideSuggestions)
    }
  };

  return business;
}

const generateWithBusinessChangeKeys = (schema: JsonSchema, keys = businessChangeKeys) => {
  const properties: Record<string, JsonSchema> = {};
  keys.forEach((key) => {
    properties[key] = schema;
  });

  return properties;
};

export const businessSchema = createSchema<Business>({
  version: 3,
  title: 'business schema',
  description: 'describes a business',
  indexes: ['organizationId'],
  required: ['name', 'data'],
  properties: {
    image: {
      type: ['string', 'null']
    },
    description: {
      type: ['string', 'null']
    },
    organizationId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    slug: {
      type: 'string'
    },
    data: {
      type: 'object',
      properties: {
        core: {
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
            description: {
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
        images: {
          type: 'object',
          properties: {
            logo: {
              type: 'string'
            },
            cover: {
              type: 'string'
            },
            favicon: {
              type: 'string'
            }
          }
        }
      }
    },
    meta: {
      type: 'object',
      properties: {
        images: {
          type: 'object',
          properties: generateWithBusinessChangeKeys(
            {
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
            businessChangeSLImagesKeys
          )
        },
        provideSuggestions: {
          type: 'object',
          properties: generateWithBusinessChangeKeys({ type: 'boolean' })
        },
        scores: {
          type: 'object',
          properties: generateWithBusinessChangeKeys({
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                score: { type: 'number' },
                weight: { type: 'number' },
                body: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }
          })
        }
      }
    }
  }
});
