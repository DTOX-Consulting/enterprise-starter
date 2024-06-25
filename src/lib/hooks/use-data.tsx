'use client';

import { type atom, useAtom } from 'jotai';
import localForage from 'localforage';
import { useCallback, type MouseEventHandler } from 'react';
import isEqual from 'react-fast-compare';
import { merge } from 'ts-deepmerge';

import { ToastAction } from '@/components/ui/organisms/toast/toast';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { debounce, useDebounceEffect } from '@/lib/hooks/use-debounce';
import { useUser } from '@/lib/hooks/use-user';
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

interface MinimalData {
  id: string;
  name?: string;
  createdAt?: string;
  lastUpdated?: string;
}

export function useLocalData<T extends MinimalData>(storageKeyPrefix?: string) {
  const { getStorageKey } = useUser();

  const storageKey = storageKeyPrefix ? getStorageKey(storageKeyPrefix) : null;

  const getLocalItems = useCallback(
    async () => (storageKey ? localForage.getItem<T[]>(storageKey) : null),
    [storageKey]
  );

  const setLocalItems = useCallback(
    async (items: T[]) => (storageKey ? localForage.setItem(storageKey, items) : null),
    [storageKey]
  );
  return { getLocalItems, setLocalItems };
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
      const foundData = data.find((d) => d.name === dataName);
      foundData && setCurrentData(foundData);
    },
    [data, setCurrentData]
  );

  const getDefaultData = useCallback(
    (defaultData?: T) => [data.find((d) => d.name === 'Default') ?? defaultData].filter(Boolean),
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

      debounce('retrieve-data', async () => {
        await runCBData(updatedData, cbdata, true);

        setData(updatedData);
        updatedData[0] && setCurrentData(updatedData[0]);
      });
    },
    [data, setData, setCurrentData, getItems, getDefaultData, runCBData]
  );

  const createData = useCallback(
    async (
      newData: PartialWithoutKeys<T, 'id' | 'createdAt' | 'lastUpdated'>,
      cbdata?: (data: T[]) => Promise<void>
    ) => {
      const similar = 'name' in newData && data.some((d) => d.name === newData.name);

      if (similar) {
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

      return Promise.resolve(mergedData);
    },
    [data, setData, setCurrentData, runCBData]
  );

  const updateData = useCallback(
    async (id: string, newData: Partial<T>, cbdata?: (data: T[]) => Promise<void>) => {
      const currentData = data.find((d) => d.id === id);

      if (!currentData) {
        toast({
          title: 'Error',
          description: 'Data not found'
        });

        return;
      }

      const createdAt = currentData.createdAt;
      const lastUpdated = new Date().toISOString();
      const standardData = { id, createdAt, lastUpdated };

      const mergedData = merge.withOptions(
        { mergeArrays: false },
        currentData,
        newData,
        standardData
      ) as T;

      Object.assign(currentData, mergedData);

      debounce(id, () => {
        setCurrentData(mergedData);
        setData((prevData) => {
          const updatedData = prevData.map((d) => (d.id === id ? mergedData : d));
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
      (e) => {
        e.stopPropagation();
        e.preventDefault();

        toast({
          title: `Deleting ${dataToDelete.name}`,
          description: 'Are you sure you want to delete?',
          action: (
            <ToastAction
              altText="Delete"
              onClick={() => {
                setData((prevData) => {
                  const updatedData = prevData.filter((d) => d.id !== dataToDelete.id);
                  danglingPromise(runCBData(updatedData, cbdata));
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
    'retrieve-data-on-mount',
    () => (retrieveOnMount ? danglingPromise(retrieveData()) : undefined),
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
