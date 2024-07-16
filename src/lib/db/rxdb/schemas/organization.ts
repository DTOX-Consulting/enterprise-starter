import { createSchema } from '@/lib/db/rxdb/utils/schema';

export interface Organization {
  ownerId: string;
  name: string;
  type: string;
}

export const organizationSchema = createSchema<Organization>({
  title: 'organization schema',
  description: 'describes an organization',
  indexes: ['ownerId'],
  required: ['ownerId', 'name', 'type'],
  properties: {
    ownerId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
});
