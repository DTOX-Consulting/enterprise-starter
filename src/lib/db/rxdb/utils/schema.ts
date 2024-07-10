import { merge } from 'ts-deepmerge';

import { nanoid } from '@/lib/utils/id';

import type { PartialWithKeys } from '@/lib/types';
import type { DeepReadonly, GenericObject } from '@/lib/utils/object';
import type { RxCollectionCreator, RxJsonSchema } from 'rxdb';

export type CommonProperties = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type CommonPropertiesKeys = keyof CommonProperties;

const commonRequired = ['id', 'createdAt', 'updatedAt'] as CommonPropertiesKeys[];

export const commonProperties: RxCollectionCreator<CommonProperties>['schema']['properties'] = {
  id: {
    type: 'string',
    maxLength: 100
  },
  createdAt: {
    maxLength: 24,
    type: 'string',
    format: 'date-time'
  },
  updatedAt: {
    maxLength: 24,
    type: 'string',
    format: 'date-time'
  }
};

export const createSchema = <
  T extends GenericObject,
  K extends CollectionSchema<T> = CollectionSchema<T>
>({
  title,
  properties,
  description,
  version = 0,
  indexes = [],
  required = []
}: {
  title: string;
  version?: number;
  description: string;
  indexes: Extract<keyof T, string>[];
  required: Extract<keyof T, string>[];
  properties: RxCollectionCreator<T>['schema']['properties'];
}): RxJsonSchema<K> => {
  const allRequired = [...commonRequired, ...required] as Extract<keyof K, string>[];

  const allProperties = {
    ...properties,
    ...commonProperties
  } as K;

  const type = 'object';
  const keyCompression = true;
  const primaryKey = 'id' as Extract<keyof K, string>;

  indexes.forEach((index) => {
    allProperties[index].maxLength ??= 100;
  });

  const schema: RxJsonSchema<K> = {
    type,
    title,
    version,
    indexes,
    primaryKey,
    description,
    keyCompression,
    required: allRequired,
    properties: allProperties
  };

  return schema;
};

export const addCommonProperties = <
  T extends GenericObject,
  U = T extends NCS<T> ? NCS<T> : PNCS<T>,
  R = U extends NCS<T> ? CS<T> : PCS<T> & CommonProperties
>(
  data: U
): R => {
  const id = nanoid();
  const now = new Date().toISOString();

  return {
    id,
    createdAt: now,
    ...data,
    updatedAt: now
  } as R;
};

export function mergeData<T extends GenericObject, U extends DCS<T> = DCS<T>>(
  currentData: U,
  newData: Partial<U>
): U {
  return merge.withOptions({ mergeArrays: false }, currentData, addCommonProperties(newData)) as U;
}

export type CollectionSchema<T extends GenericObject> = T & CommonProperties;

export type CS<T extends GenericObject> = CollectionSchema<T>;
export type DCS<T extends GenericObject> = DeepReadonly<CS<T>>;

export type PCS<T extends GenericObject> = Partial<CS<T>>;
export type PCSI<T extends GenericObject> = PartialWithKeys<CS<T>, 'id'>;
export type PDCSI<T extends GenericObject> = PartialWithKeys<DCS<T>, 'id'>;

export type NCS<T extends GenericObject> = Omit<CS<T>, CommonPropertiesKeys>;
export type NCSI<T extends GenericObject> = Omit<CS<T>, Exclude<CommonPropertiesKeys, 'id'>>;

export type PNCS<T extends GenericObject> = Partial<NCS<T>>;
export type PNCSI<T extends GenericObject> = PNCS<T> & { id: string };

export type NCSNO<T extends GenericObject> = Omit<NCS<T>, 'ownerId'>;
export type PNCSNO<T extends GenericObject> = Partial<NCSNO<T>>;
export type PNCSNOI<T extends GenericObject> = PNCSNO<T> & { id: string };
