import { compressStorage } from '@/lib/db/rxdb/storage/compress';
import { storage } from '@/lib/db/rxdb/storage/dexie';
import { isProd } from '@/lib/env/env.mjs';

import type { RxStorage } from 'rxdb';

export async function setupStorage(): Promise<RxStorage<unknown, unknown>> {
  if (isProd()) return compressStorage(await storage());

  const { addValidation } = await import('@/lib/db/rxdb/storage/validate');
  return compressStorage(addValidation(await storage()));
}
