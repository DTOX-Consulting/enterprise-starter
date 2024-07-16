import { schemas, type Schema } from '@/lib/db/rxdb/schemas';

import type { RxCollectionCreator, RxDatabase } from 'rxdb';

export const addCollections = async (db: RxDatabase) => {
  const collections = createCollections(schemas);
  return db.addCollections(collections);
};

const createCollections = (schemas: Schema) => {
  return Object.entries(schemas).reduce(
    (acc, [name, schema]) => {
      acc[name] = { schema };
      return acc;
    },
    {} as Record<string, RxCollectionCreator>
  );
};
