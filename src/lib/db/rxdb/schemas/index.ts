import { businessSchema } from '@/lib/db/rxdb/schemas/business';
import { historySchema } from '@/lib/db/rxdb/schemas/history';
import { notificationSchema } from '@/lib/db/rxdb/schemas/notification';
import { organizationSchema } from '@/lib/db/rxdb/schemas/organization';
import { organizationBusinessSchema } from '@/lib/db/rxdb/schemas/organization_business';

import type { GenericObject } from '@/lib/utils/object';
import type { RxDocument, RxJsonSchema } from 'rxdb';

export const schemas = {
  history: historySchema,
  business: businessSchema,
  notification: notificationSchema,
  organization: organizationSchema,
  organization_business: organizationBusinessSchema
} as const;

export type Schema = typeof schemas;
export type SchemaName = keyof Schema;
export type AvailableSchemas = Schema[keyof Schema];

export type SchemaType<T extends SchemaName> = Schema[T] extends RxJsonSchema<infer U>
  ? U extends GenericObject
    ? U
    : never
  : never;

export type SchemaDocument<
  T extends SchemaName,
  U extends SchemaType<T> = SchemaType<T>
> = RxDocument<U>;
