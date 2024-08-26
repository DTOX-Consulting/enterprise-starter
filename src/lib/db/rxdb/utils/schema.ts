import { G } from '@mobily/ts-belt';
import { nanoid } from 'nanoid';
import { merge } from 'ts-deepmerge';

import type { PartialWithKeys } from '@/lib/types';
import type { DeepReadonly, GenericObject } from '@/lib/utils/object';
import type { RxCollectionCreator, RxJsonSchema } from 'rxdb';

export type CommonProperties = {
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

type CommonPropertiesKeys = keyof CommonProperties;

const commonIndexes = ['ownerId'] as CommonPropertiesKeys[];

const commonRequired = ['id', 'ownerId', 'createdAt', 'updatedAt'] as CommonPropertiesKeys[];

export const commonProperties: RxCollectionCreator<CommonProperties>['schema']['properties'] = {
  id: {
    type: 'string',
    maxLength: 100
  },
  ownerId: {
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
  indexes?: Extract<keyof T, string>[];
  required?: Extract<keyof T, string>[];
  properties: RxCollectionCreator<T>['schema']['properties'];
}): RxJsonSchema<K> => {
  const allIndexes = [...commonIndexes, ...indexes] as Extract<keyof K, string>[];
  const allRequired = [...commonRequired, ...required] as Extract<keyof K, string>[];

  const allProperties = {
    ...properties,
    ...commonProperties
  } as K;

  const type = 'object';
  const keyCompression = true;
  const primaryKey = 'id' as Extract<keyof K, string>;

  allIndexes.forEach((index) => {
    allProperties[index].maxLength ??= 100;
  });

  const schema: RxJsonSchema<K> = {
    type,
    title,
    version,

    primaryKey,
    description,
    keyCompression,
    indexes: allIndexes,
    required: allRequired,
    properties: allProperties
  };

  return schema;
};

export const addCommonProperties = <
  T extends GenericObject,
  U extends GenericObject = T extends NCS<T> ? NCS<T> : PNCS<T>,
  R = U extends NCS<T> ? CS<T> : PNCS<T> & CommonProperties
>({
  id,
  data,
  ownerId
}: {
  data: U;
  ownerId?: string;
  id?: string | undefined;
}): R => {
  const now = new Date().toISOString();
  const isNew = G.isNullable(id);
  id ??= nanoid();

  if (G.isNullable(id)) {
    throw new Error('id is required');
  }

  if (G.isNullable(ownerId)) {
    throw new Error('ownerId is required');
  }

  return {
    ...data,
    id,
    ownerId,
    updatedAt: now,
    createdAt: isNew ? now : ((data.createdAt ?? now) as string)
    // ...(isNew ? { createdAt: now } : {})
  } as R;
};

export function mergeData<T extends GenericObject, U extends DCS<T> = DCS<T>>(
  currentData: U,
  newData: Partial<U>,
  id: string = currentData.id
): U {
  return merge.withOptions(
    { mergeArrays: false },
    currentData,
    addCommonProperties({ id, data: newData, ownerId: currentData.ownerId })
  ) as U;
}

export type CollectionSchema<T extends GenericObject> = T & CommonProperties;

export type CS<T extends GenericObject> = CollectionSchema<T>;
export type DCS<T extends GenericObject> = DeepReadonly<CS<T>>;
export type NCS<T extends GenericObject> = Omit<CS<T>, CommonPropertiesKeys>;

export type PNCS<T extends GenericObject> = Partial<NCS<T>>;
export type PCSI<T extends GenericObject> = PartialWithKeys<CS<T>, 'id'>;
export type PDCSI<T extends GenericObject> = PartialWithKeys<DCS<T>, 'id'>;
