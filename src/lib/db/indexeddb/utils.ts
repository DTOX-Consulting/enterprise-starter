import { G } from '@mobily/ts-belt';
import { delay } from 'already';

export const deleteDbs = async () => {
  const dbs = await indexedDB.databases();

  const deletePromises = dbs.map(
    async (db) =>
      new Promise<void>((resolve, reject) => {
        if (!G.isNotNullable(db.name)) {
          resolve();
          return;
        }
        const request = indexedDB.deleteDatabase(db.name);
        request.onsuccess = () => {
          console.log(`Deleted database: ${db.name}`);
          resolve();
        };
        request.onerror = () => {
          console.error(`Error deleting database: ${db.name}`);
          reject(request.error as Error);
        };
      })
  );

  await Promise.all(deletePromises);
  await delay(1000); // Wait for the databases to be deleted
  const test = await indexedDB.databases();
  return test.length === 0;
};

function handleTransactionComplete(dbName: string, resolveFn: () => void) {
  console.log(`Cleared database: ${dbName}`);
  resolveFn();
}

function handleTransactionError(rejectFn: (reason?: Error) => void, error: DOMException | null) {
  rejectFn(error as Error);
}

function clearObjectStores(
  database: IDBDatabase,
  resolveFn: () => void,
  rejectFn: (reason?: Error) => void
) {
  if (database.objectStoreNames.length > 0) {
    const transaction = database.transaction(database.objectStoreNames, 'readwrite');
    transaction.oncomplete = () => handleTransactionComplete(database.name, resolveFn);
    transaction.onerror = () => handleTransactionError(rejectFn, transaction.error);

    for (const name of database.objectStoreNames) {
      const objectStore = transaction.objectStore(name);
      objectStore.clear();
    }
  } else {
    console.log(`No object stores to clear in database: ${database.name}`);
    resolveFn();
  }
}

function openDatabase(
  db: IDBDatabaseInfo,
  resolveFn: () => void,
  rejectFn: (reason?: Error) => void
) {
  if (!G.isNotNullable(db.name)) {
    resolveFn();
    return;
  }
  const request = indexedDB.open(db.name);
  request.onerror = () => rejectFn(request.error as Error);
  request.onsuccess = () => clearObjectStores(request.result, resolveFn, rejectFn);
}

export const clearDbs = async () => {
  const dbs = await indexedDB.databases();

  const clearPromises = dbs.map(
    async (db) =>
      new Promise<void>((resolve, reject) => {
        openDatabase(db, resolve, reject);
      })
  );

  await Promise.all(clearPromises);
  await delay(1000);
  const test = await indexedDB.databases();
  return test.length === dbs.length;
};
