import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { PCSI } from '@/lib/db/rxdb/utils/schema';

export type PartialBusinessWithIds = PCSI<Business> & { organizationId: string };

export type BusinessChangeSLKeys = keyof Business['data'];
export type BusinessChangeFLKeys = 'name' | 'image' | 'description';
export type BusinessChangeKeys = BusinessChangeFLKeys | BusinessChangeSLKeys;

export const businessChangeFLKeys: BusinessChangeFLKeys[] = ['name', 'image', 'description'];

export const businessChangeSLKeys: BusinessChangeSLKeys[] = [
  'vision',
  'mission',
  'problem',
  'tagline',
  'industry'
];

export const businessChangeKeys: BusinessChangeKeys[] = [
  ...businessChangeFLKeys,
  ...businessChangeSLKeys
];

export const isBusinessChangeKey = (key: string): key is BusinessChangeKeys =>
  businessChangeKeys.includes(key as BusinessChangeKeys);

export const isBusinessChangeFLKey = (key: string): key is BusinessChangeFLKeys =>
  businessChangeFLKeys.includes(key as BusinessChangeFLKeys);

export const isBusinessChangeSLKey = (key: string): key is BusinessChangeSLKeys =>
  businessChangeSLKeys.includes(key as BusinessChangeSLKeys);
