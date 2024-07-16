import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';

import { isProd } from '@/lib/env';

import type { RxStorage } from 'rxdb';

const getStorage = async () => {
  const { getRxStorageDexie } = await import('rxdb/plugins/storage-dexie');
  return getRxStorageDexie();
};

const compressStorage = <T, K>(storage: RxStorage<T, K>) =>
  wrappedKeyCompressionStorage({
    storage
  });

export async function setupStorage() {
  if (isProd()) return compressStorage(await getStorage());

  const { storage } = await import('@/lib/db/rxdb/dev/storage');
  return compressStorage(storage);
}
