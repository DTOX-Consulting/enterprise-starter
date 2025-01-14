export const availablePermissions = [
  'cache.set',
  'cache.get',
  'storage:upload',
  'storage:retrieve'
] as const;

export type AvailablePermissions = (typeof availablePermissions)[number];

export const defaultPermissions: AvailablePermissions[] = [
  'cache.set',
  'cache.get',
  'storage:upload',
  'storage:retrieve'
];
