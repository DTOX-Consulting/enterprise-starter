import { delay } from 'already';

import { SupabaseReplication } from '@/lib/db/rxdb/utils/replication/supabase-replication-class';
import { supabase } from '@/lib/sdks/supabase/client';
import { config } from '@/lib/sdks/supabase/config';

import type { RxCollection, RxDatabase } from 'rxdb';

export const addReplication = (
  userId: string,
  _db: RxDatabase,
  collections: Record<string, RxCollection>
) => {
  return Object.entries(collections).reduce(
    (acc, [name, collection]) => {
      if (collection.name === 'organization_business') return acc;
      const replication = createReplication(collection, userId);
      acc[name] = replication;
      return acc;
    },
    {} as Record<string, SupabaseReplication<unknown>>
  );
};

const createReplication = <T>(collection: RxCollection<T>, userId: string) => {
  const replication = new SupabaseReplication<T>({
    live: true,
    autoStart: true,
    collection: collection,
    supabaseClient: supabase,
    /**
     * An ID for the replication, so that RxDB is able to resume the replication
     * on app reload. It is recommended to add the supabase URL to make sure you're
     * not mixing up replications against different databases.
     *
     * If you're using row-level security, you might also want to append the user ID
     * in case the logged in user changes, although depending on your application you
     * might want to re-create the entire RxDB from scratch in that case or have one
     * RxDB per user ID (you could add the user ID to the RxDB name).
     */
    replicationIdentifier: `${userId}_${config.auth.url}`,
    push: {}, // If absent, no changes are pushed to Supabase
    pull: {}, // If absent, no data is pulled from Supabase
    keyMapping: {
      ownerId: 'ownerid',
      businessId: 'businessid',
      organizationId: 'organizationid',
      createdAt: 'createdat',
      updatedAt: 'updatedat'
    }
  });

  return replication;
};

export const startReplication = async (
  replication: Record<string, SupabaseReplication<unknown>>
) => {
  await delay(1000);
  Object.values(replication).forEach((replication) => {
    void replication.start();
  });
};

const minDelayTime = 1000 * 30;
const maxDelayTime = minDelayTime * 2 ** 5;

export const resyncReplication = async (
  replication: Record<string, SupabaseReplication<unknown>>,
  delayTime = minDelayTime
) => {
  await delay(delayTime);

  Object.values(replication).forEach((replication) => {
    replication.reSync();
  });

  await resyncReplication(replication, delayTime > maxDelayTime ? minDelayTime : delayTime * 2);
};
