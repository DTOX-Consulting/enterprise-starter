export const storage = async () => {
  const { getRxStorageDexie } = await import('rxdb/plugins/storage-dexie');

  return getRxStorageDexie({
    autoOpen: true,
    allowEmptyDB: true,
    cache: 'immutable'
  });
};
