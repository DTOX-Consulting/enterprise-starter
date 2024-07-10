import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { isProd } from '@/lib/env';

import type { RxStorage } from 'rxdb';

const getStorage = () => getRxStorageDexie();

const compressStorage = <T, K>(storage: RxStorage<T, K>) =>
  wrappedKeyCompressionStorage({
    storage
  });

export async function setupStorage() {
  if (isProd()) return compressStorage(getStorage());

  const { storage } = await import('@/lib/db/rxdb/dev/storage');
  return compressStorage(storage);
}
