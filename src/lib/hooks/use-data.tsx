'use client';

import { G } from '@mobily/ts-belt';
import { type atom, useAtom } from 'jotai';
import localForage from 'localforage';
import { useCallback, type MouseEventHandler } from 'react';
import isEqual from 'react-fast-compare';
import { merge } from 'ts-deepmerge';

import { ToastAction } from '@/components/ui/organisms/toast/toast';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { useAuth } from '@/lib/hooks/use-auth';
import { debounce, useDebounceEffect } from '@/lib/hooks/use-debounce';
import { deepClone } from '@/lib/utils/clone';
import { nanoid } from '@/lib/utils/id';
import { danglingPromise } from '@/lib/utils/promise';

import type { PartialWithoutKeys } from '@/lib/types';

type DataProps<T> = {
  retrieveOnMount?: boolean;
  storageKeyPrefix?: string;
  itemGetter?: () => Promise<T[]>;
  itemSetter?: (items: T[]) => Promise<void>;
  dataAtom: ReturnType<typeof atom<T[]>>;
  currentDataAtom: ReturnType<typeof atom<T | null>>;
};

type MinimalData = {
  id: string;
  name?: string;
  createdAt?: string;
  lastUpdated?: string;
};

export function useLocalData<T extends MinimalData>(storageKeyPrefix?: string) {
  const { getStorageKey } = useAuth();

  const storageKey = G.isNotNullable(storageKeyPrefix) ? getStorageKey(storageKeyPrefix) : null;

  const getLocalItems = useCallback(async () => {
    if (!G.isNotNullable(storageKey)) return null;
    const items = await localForage.getItem<T[]>(storageKey);
    return items ?? null;
  }, [storageKey]);

  const setLocalItems = useCallback(
    async (items: T[]) => {
      if (G.isNotNullable(storageKey)) {
        await localForage.setItem(storageKey, items);
      }
    },
    [storageKey]
  );
  return { getLocalItems, setLocalItems, storageKey };
}

export function useData<T extends MinimalData>({
  dataAtom,
  itemGetter,
  itemSetter,
  currentDataAtom,
  retrieveOnMount,
  storageKeyPrefix
}: DataProps<T>) {
  const [data, setData] = useAtom(dataAtom);
  const [currentData, setCurrentData] = useAtom(currentDataAtom);
  const { getLocalItems, setLocalItems } = useLocalData<T>(storageKeyPrefix);

  const getItems = itemGetter ?? getLocalItems;
  const setItems = itemSetter ?? setLocalItems;

  const setCurrentDataByName = useCallback(
    (dataName: string) => {
      const foundData = data.find((item) => item.name === dataName);
      if (foundData) {
        setCurrentData(foundData);
      }
    },
    [data, setCurrentData]
  );

  const getDefaultData = useCallback(
    (defaultData?: T) =>
      [data.find((item) => item.name === 'Default') ?? defaultData].filter(Boolean),
    [data]
  );

  const runCBData = useCallback(
    async (updatedData: T[], cbdata?: (data: T[]) => Promise<void>, checkIsEqual = false) => {
      const clonedData = deepClone(updatedData);
      await cbdata?.(updatedData);

      if (checkIsEqual && isEqual(updatedData, clonedData)) return;
      await setItems(updatedData);
    },
    [setItems]
  );

  const retrieveData = useCallback(
    async (defaultData?: T, cbdata?: (data: T[]) => Promise<void>) => {
      const updatedData = (await getItems()) ?? getDefaultData(defaultData);
      if (isEqual(data, updatedData)) return;

      debounce(`retrieve-data-${storageKeyPrefix}`, async () => {
        await runCBData(updatedData, cbdata, true);

        setData(updatedData);
      });
    },
    [data, setData, getItems, getDefaultData, runCBData, storageKeyPrefix]
  );

  const createData = useCallback(
    async (
      newData: PartialWithoutKeys<T, 'id' | 'createdAt' | 'lastUpdated'>,
      cbdata?: (data: T[]) => Promise<void>
    ) => {
      const nameExists = 'name' in newData && data.some((item) => item.name === newData.name);

      if (nameExists) {
        toast({
          title: 'Error',
          description: `${newData.name} already exists. Please choose a different name.`
        });

        return;
      }

      const id = nanoid();
      const createdAt = new Date().toISOString();
      const lastUpdated = new Date().toISOString();
      const standardData = { id, createdAt, lastUpdated };
      const mergedData = merge.withOptions({ mergeArrays: false }, newData, standardData) as T;

      setCurrentData(mergedData);
      setData((prevData) => {
        const updatedData = [...prevData, mergedData];
        danglingPromise(runCBData(updatedData, cbdata));
        return updatedData;
      });

      return mergedData;
    },
    [data, setData, setCurrentData, runCBData]
  );

  const updateData = useCallback(
    async (
      id: string,
      newData: Partial<T>,
      cbdata?: (data: T[]) => Promise<void>,
      currData?: T
    ) => {
      const currentItem = currData ?? data.find((item) => item.id === id);

      if (!currentItem) {
        toast({
          title: 'Error',
          description: 'Data not found'
        });

        return;
      }

      const { createdAt } = currentItem;
      const lastUpdated = new Date().toISOString();
      const standardData = { id, createdAt, lastUpdated };

      const mergedData = merge.withOptions(
        { mergeArrays: false },
        currentItem,
        newData,
        standardData
      ) as T;

      Object.assign(currentItem, mergedData);

      debounce(id, () => {
        setCurrentData(mergedData);
        setData((prevData) => {
          const updatedData = prevData.map((item) => (item.id === id ? mergedData : item));
          danglingPromise(runCBData(updatedData, cbdata));
          return updatedData;
        });
      });

      return Promise.resolve();
    },
    [data, setData, setCurrentData, runCBData]
  );

  const deleteData = useCallback(
    (dataToDelete: T, cbdata?: (data: T[]) => Promise<void>): MouseEventHandler<SVGSVGElement> =>
      (event) => {
        event.stopPropagation();
        event.preventDefault();

        toast({
          variant: 'destructive',
          title: `Deleting ${dataToDelete.name}`,
          description: 'Are you sure you want to delete?',
          action: (
            <ToastAction
              altText="Delete"
              onClick={() => {
                setData((prevData) => {
                  const updatedData = prevData.filter((item) => item.id !== dataToDelete.id);
                  void runCBData(updatedData, cbdata);
                  return updatedData;
                });
              }}
            >
              Delete
            </ToastAction>
          )
        });
      },
    [setData, runCBData]
  );

  useDebounceEffect(
    `retrieve-data-on-mount-${storageKeyPrefix}`,
    () => {
      if (retrieveOnMount === true) {
        void retrieveData();
      }
    },
    [retrieveData, retrieveOnMount]
  );

  return {
    data,
    setData,
    currentData,
    createData,
    updateData,
    deleteData,
    retrieveData,
    setCurrentData,
    setCurrentDataByName
  };
}
