import { addRxPlugin } from 'rxdb';
import { RxDBCleanupPlugin } from 'rxdb/plugins/cleanup';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { observeNewCollections } from 'rxdb-hooks';

import { isProd } from '@/lib/env/env.mjs';

export const setupPlugins = async () => {
  addRxPlugin(RxDBUpdatePlugin);
  // addRxPlugin(RxDBBackupPlugin); // needs node:fs
  addRxPlugin(RxDBCleanupPlugin);
  addRxPlugin(observeNewCollections);
  addRxPlugin(RxDBQueryBuilderPlugin);
  addRxPlugin(RxDBLeaderElectionPlugin);
  addRxPlugin(RxDBMigrationSchemaPlugin);

  if (isProd()) return;
  await import('@/lib/db/rxdb/utils/dev-plugins');
};
