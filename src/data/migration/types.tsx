import type { Option } from '@/data/option';
import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { History } from '@/lib/db/rxdb/schemas/history';
import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { Organization } from '@/lib/db/rxdb/schemas/organization';
import type { CollectionSchema, CommonProperties } from '@/lib/db/rxdb/utils/schema';
import type { RxCollection } from 'rxdb';

export type { History, Business, Notification, Organization };

export type HistorySchema = CollectionSchema<History>;
export type BusinessSchema = CollectionSchema<Business>;
export type NotificationSchema = CollectionSchema<Notification>;
export type OrganizationSchema = CollectionSchema<Organization>;

export type HistoryCollection = RxCollection<HistorySchema>;
export type BusinessCollection = RxCollection<BusinessSchema>;
export type NotificationCollection = RxCollection<NotificationSchema>;
export type OrganizationCollection = RxCollection<OrganizationSchema>;

type PreviousData<T> = Omit<CommonProperties, 'updatedAt'> &
  Omit<T, 'ownerId' | 'organizationId' | 'value'> & { lastUpdated: string };

export type PreviousDataBusiness = PreviousData<Business>;
export type PreviousDataNotification = PreviousData<Notification>;
export type PreviousDataOrganization = PreviousData<Organization> & {
  businesses?: PreviousDataBusiness[];
};

export type PreviousDataHistory = PreviousData<History> & {
  value: string | Option[];
};
