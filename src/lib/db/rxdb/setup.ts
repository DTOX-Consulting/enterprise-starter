import { createRxDatabase } from 'rxdb';

import { DB_NAME } from '@/lib/db/rxdb/constants';
import { addCollections } from '@/lib/db/rxdb/utils/collection';
import { setupPlugins } from '@/lib/db/rxdb/utils/plugins';
import { addReplication, resyncReplication } from '@/lib/db/rxdb/utils/replication/supabase';
import { setupStorage } from '@/lib/db/rxdb/utils/storage';

export async function create(name = 'app') {
  await setupPlugins();

  const db = await createRxDatabase({
    storage: await setupStorage(),
    ignoreDuplicate: true,
    multiInstance: true,
    eventReduce: true,
    name
  });

  return db;
}

export const initialize = async (userId?: string) => {
  if (!userId) throw new Error('User ID is required to initialize RXDB');

  const db = await create(DB_NAME);
  // await db.waitForLeadership();

  try {
    const collections = await addCollections(db);
    const replication = addReplication(userId, db, collections);
    void resyncReplication(replication);
    return { db, collections, replication };
  } catch (e) {
    console.error(e);
  }

  return { db };
};

export type InitializedDB = Awaited<ReturnType<typeof initialize>>;
