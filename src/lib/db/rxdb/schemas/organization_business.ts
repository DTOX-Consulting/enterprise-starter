import { createSchema } from '@/lib/db/rxdb/utils/schema';

export interface OrganizationBusiness {
  organizationId: string;
  businessId: string;
}

export const organizationBusinessSchema = createSchema<OrganizationBusiness>({
  title: 'organization / business join schema',
  description: 'describes the relationship between an organization and a business',
  indexes: ['organizationId', 'businessId'],
  required: ['organizationId', 'businessId'],
  properties: {
    organizationId: {
      type: 'string'
    },
    businessId: {
      type: 'string'
    }
  }
});
