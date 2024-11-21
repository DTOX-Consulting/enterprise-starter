import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';

import type { RxStorage } from 'rxdb';

export const compressStorage = <T, K>(storage: RxStorage<T, K>): RxStorage<T, K> =>
  wrappedKeyCompressionStorage({
    storage
  });
