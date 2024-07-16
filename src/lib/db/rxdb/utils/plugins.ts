import { addRxPlugin } from 'rxdb';
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { observeNewCollections } from 'rxdb-hooks';

// import { setPremiumFlag } from 'rxdb-premium/plugins/shared';
import { isProd } from '@/lib/env';

export const setupPlugins = async () => {
  // setPremiumFlag();
  addRxPlugin(RxDBUpdatePlugin);
  // addRxPlugin(RxDBBackupPlugin); // needs node:fs
  addRxPlugin(RxDBCleanupPlugin);
  addRxPlugin(observeNewCollections);
  addRxPlugin(RxDBQueryBuilderPlugin);
  addRxPlugin(RxDBLeaderElectionPlugin);

  if (isProd()) return;
  await import('@/lib/db/rxdb/dev/plugins');
};
