import { businessSchema } from '@/lib/db/rxdb/schemas/business';
import { historySchema } from '@/lib/db/rxdb/schemas/history';
import { notificationSchema } from '@/lib/db/rxdb/schemas/notification';
import { organizationSchema } from '@/lib/db/rxdb/schemas/organization';
import { userMetaSchema } from '@/lib/db/rxdb/schemas/user-meta';

import type { GenericObject } from '@/lib/utils/object';
import type { RxDocument, RxJsonSchema } from 'rxdb';

export const schemas = {
  history: historySchema,
  business: businessSchema,
  user_meta: userMetaSchema,
  notification: notificationSchema,
  organization: organizationSchema
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
