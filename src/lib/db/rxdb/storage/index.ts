import { compressStorage } from '@/lib/db/rxdb/storage/compress';
import { storage } from '@/lib/db/rxdb/storage/dexie';
import { isProd } from '@/lib/env/env.mjs';

export async function setupStorage() {
  if (isProd()) return compressStorage(await storage());

  const { addValidation } = await import('@/lib/db/rxdb/storage/validate');
  return compressStorage(addValidation(await storage()));
}
