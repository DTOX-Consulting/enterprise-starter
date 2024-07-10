import { G } from '@mobily/ts-belt';
import { differenceInMilliseconds } from 'date-fns';
import PQueue from 'p-queue';
import isEqual from 'react-fast-compare';

import { danglingPromise } from '@/lib/utils/promise';

import type { useDBData, useDBDataExtras, useDBDataExtrasMutation } from '@/data';
import type { useAIGenerator } from '@/data/components/ai-generator';
import type { BusinessChangeKeys } from '@/data/guards';
import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { DCS } from '@/lib/db/rxdb/utils/schema';
import type { useLocalData } from '@/lib/hooks/use-data';

import { checkFeatureSimilarity } from '@/app/(authenticated)/businesses/utils/formatters';
import { onViewRetrieve } from '@/app/(authenticated)/businesses/utils/handlers';

export type AIUpdate = {
  id: string;
  processing: boolean;
  lastUpdated: string;
};

type CurrentData = {
  timeout?: Timer;
  storageKey: ReturnType<typeof useLocalData>['storageKey'];
  getHistory: ReturnType<typeof useDBDataExtras>['getHistory'];
  callCurrent: ReturnType<typeof useAIGenerator>['callCurrent'];
  currentBusinesses?: ReturnType<typeof useDBData>['currentBusinesses'];
  getLocalItems: ReturnType<typeof useLocalData<AIUpdate>>['getLocalItems'];
  setLocalItems: ReturnType<typeof useLocalData<AIUpdate>>['setLocalItems'];
  createNotification: ReturnType<typeof useDBDataExtrasMutation>['createNotification'];
};

const minDateDiff = 1000 * 60 * 5;
const queue = new PQueue({ concurrency: 1 });
let currentData: CurrentData = {} as CurrentData;

export function processor(data: CurrentData, clear = false) {
  if (!data.currentBusinesses) {
    return;
  }

  updateCurrentData(data);

  if (currentData.timeout && clear) {
    clearTimeout(currentData.timeout);
    currentData.timeout = undefined;
  } else if (currentData.timeout) {
    return;
  }

  reprocess();
  processBusinesses(currentData);
}

function reprocess() {
  currentData.timeout = setTimeout(() => processor(currentData, true), minDateDiff);
}

function processBusinesses(data: CurrentData) {
  currentData.currentBusinesses?.forEach((currentBusiness) => {
    danglingPromise(processBusiness(data, currentBusiness));
  });
}

async function processBusiness(data: CurrentData, currentBusiness: DCS<Business>) {
  const { getHistory, callCurrent, getLocalItems, setLocalItems, createNotification } = data;

  const aiUpdate = {
    processing: false,
    id: currentBusiness.id,
    lastUpdated: new Date().toISOString()
  };

  const items = await getLocalItems();

  if (!items) {
    await setLocalItems([aiUpdate]);
    return;
  }

  const index = items.findIndex((item) => item.id === currentBusiness.id);
  const current = items[index];

  if (!current) {
    await setLocalItems([...items, aiUpdate]);
    return;
  }

  if (current.processing && queue.size > 0) {
    return;
  }

  if (differenceInMilliseconds(new Date(), new Date(current.lastUpdated)) < minDateDiff) {
    return;
  }

  const currentHistory = getHistory(currentBusiness.id, { date: current.lastUpdated });
  const toQueue = new Set<BusinessChangeKeys>();

  if (
    currentHistory[0] &&
    differenceInMilliseconds(new Date(), new Date(currentHistory[0]?.updatedAt)) < minDateDiff
  ) {
    return;
  }

  danglingPromise(
    queue.add(async () => {
      items[index] = { ...current, processing: true };
      await setLocalItems(items);
    })
  );

  currentHistory.forEach((history) => {
    const provideSuggestions = currentBusiness.meta?.provideSuggestions;
    if (!provideSuggestions) {
      return;
    }

    const keys = Object.keys(provideSuggestions) as BusinessChangeKeys[];
    keys.forEach((key) => key !== history.key && provideSuggestions[key] && toQueue.add(key));
  });

  if (!toQueue.size) {
    danglingPromise(
      queue.add(async () => {
        items[index] = aiUpdate;
        await setLocalItems(items);
      })
    );

    return;
  }

  toQueue.forEach((key) => {
    danglingPromise(
      queue.add(async () => {
        const retrieveKey = key;
        const retrievedValue = onViewRetrieve(key, currentBusiness);
        if (G.isNullable(retrievedValue)) {
          return;
        }

        const newData = await callCurrent({
          retrieveKey,
          retrievedValue,
          currentBusiness,
          returnList: false
        });
        if (G.isNullable(newData)) {
          return;
        }

        const similarity = checkFeatureSimilarity(key, newData)(currentBusiness);

        if (similarity.isSimilar) {
          return;
        }

        await createNotification({
          icon: 'Sparkles',
          content: {
            action: `AI Suggested change for ${key} of ${currentBusiness.name}`
          },
          meta: {
            suggestion: {
              similarity,
              updated: newData,
              key: retrieveKey,
              current: retrievedValue,
              businessId: currentBusiness.id,
              organizationId: currentBusiness.organizationId
            }
          }
        });
      })
    );
  });

  danglingPromise(
    queue.add(async () => {
      items[index] = aiUpdate;
      await setLocalItems(items);
    })
  );
}

function updateCurrentData(data: CurrentData) {
  if (!isEqual(currentData.storageKey, data.storageKey)) {
    clearTimeout(currentData.timeout);
    currentData.timeout = undefined;
  }

  currentData = { ...currentData, ...data };
}
