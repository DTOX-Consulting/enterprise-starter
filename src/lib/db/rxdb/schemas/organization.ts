import { createSchema } from '@/lib/db/rxdb/utils/schema';

export type Organization = {
  name: string;
  type: string;
};

export const organizationSchema = createSchema<Organization>({
  title: 'organization schema',
  description: 'describes an organization',
  required: ['name', 'type'],
  properties: {
    name: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
});
