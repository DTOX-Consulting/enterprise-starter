import { G } from '@mobily/ts-belt';
import { delay } from 'already';

export const deleteDbs = async () => {
  const dbs = await indexedDB.databases();

  const deletePromises = dbs.map(
    async (db) =>
      new Promise<void>((resolve, reject) => {
        if (!G.isNotNullable(db.name)) return resolve(); // Skip if no name
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

export const clearDbs = async () => {
  const dbs = await indexedDB.databases();

  const clearPromises = dbs.map(
    async (db) =>
      new Promise<void>((resolve, reject) => {
        if (!G.isNotNullable(db.name)) return resolve(); // Skip if no name
        const request = indexedDB.open(db.name);
        request.onerror = () => reject(request.error as Error);
        request.onsuccess = () => {
          const database = request.result;
          // Check if there are any object stores to clear
          if (database.objectStoreNames.length > 0) {
            const transaction = database.transaction(database.objectStoreNames, 'readwrite');
            transaction.oncomplete = () => {
              console.log(`Cleared database: ${db.name}`);
              resolve();
            };
            transaction.onerror = () => reject(transaction.error as Error);

          const { objectStoreNames } = database;
            for (const name of objectStoreNames) {
              const objectStore = transaction.objectStore(name);
              objectStore.clear(); // Clear each object store
            }
          } else {
            console.log(`No object stores to clear in database: ${db.name}`);
            resolve(); // Resolve the promise if there are no object stores
          }
        };
        request.onupgradeneeded = () => {
          // This event is triggered if the database is being created or upgraded.
          // It's an opportunity to create object stores if needed.
          // const db = request.result;
          // Example: Create an object store if none exist (not shown here)
        };
      })
  );

  await Promise.all(clearPromises);
  await delay(1000); // Wait for the databases to be cleared
  const test = await indexedDB.databases();
  return test.length === dbs.length;
};
