import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { PDCSI } from '@/lib/db/rxdb/utils/schema';

export type PartialBusinessWithIds = PDCSI<Business> & { organizationId: string };

export type BusinessChangeFLKeys = 'name';

export type BusinessChangeSLCoreKeys = keyof Business['data']['core'];
export type BusinessChangeSLImagesKeys = keyof Business['data']['images'];

export type BusinessChangeSLKeys = BusinessChangeSLCoreKeys | BusinessChangeSLImagesKeys;

export type BusinessChangeKeys = BusinessChangeFLKeys | BusinessChangeSLKeys;

export const businessChangeFLKeys: BusinessChangeFLKeys[] = ['name'];

export const businessChangeSLCoreKeys: BusinessChangeSLCoreKeys[] = [
  'vision',
  'mission',
  'problem',
  'tagline',
  'industry',
  'description'
];

export const businessChangeSLImagesKeys: BusinessChangeSLImagesKeys[] = [
  'logo',
  'cover',
  'favicon'
];

export const businessChangeSLKeys: BusinessChangeSLKeys[] = [
  ...businessChangeSLCoreKeys,
  ...businessChangeSLImagesKeys
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

export const isBusinessChangeSLCoreKey = (key: string): key is keyof Business['data']['core'] =>
  businessChangeSLCoreKeys.includes(key as keyof Business['data']['core']);

export const isBusinessChangeSLImagesKey = (key: string): key is keyof Business['data']['images'] =>
  businessChangeSLImagesKeys.includes(key as keyof Business['data']['images']);
