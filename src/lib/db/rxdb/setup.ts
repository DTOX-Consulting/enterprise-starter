import { createRxDatabase, type RxCollection } from 'rxdb';

import { clearDbs } from '@/lib/db/indexeddb/utils';
import { DB_NAME } from '@/lib/db/rxdb/constants';
import { setupStorage } from '@/lib/db/rxdb/storage';
import { addCollections, migrateCollections } from '@/lib/db/rxdb/utils/collection';
import { setupPlugins } from '@/lib/db/rxdb/utils/plugins';

import type { UserSession } from '@/lib/sdks/kinde/api/session';

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

export const initialize = async (userSession: UserSession, clearFirst = true) => {
  if (!userSession.user.id) throw new Error('An authenticated user is required to initialize RXDB');
  const isExternal = window.location.pathname.includes('external');
  console.log('Initializing RXDB', window.location.pathname);

  if (clearFirst && !isExternal) {
    await clearDbs();
  }
  const db = await create(DB_NAME);
  // await db.waitForLeadership();

  try {
    const collections = await addCollections(db);
    await migrateCollections(collections);

    const replication = await replicate(userSession, collections);
    return { db, collections, replication };
  } catch (e) {
    console.error(e);
  }

  return { db };
};

const replicate = async (userSession: UserSession, collections: Record<string, RxCollection>) => {
  const { addReplication, resyncReplication } = await import(
    '@/lib/db/rxdb/utils/replication/supabase'
  );

  const replication = addReplication(userSession, collections);
  void resyncReplication(replication);
  return replication;
};

export type InitializedDB = Awaited<ReturnType<typeof initialize>>;
