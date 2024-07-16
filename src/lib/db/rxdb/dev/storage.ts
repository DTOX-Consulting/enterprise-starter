import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

export const storage = wrappedValidateAjvStorage({
  storage: getRxStorageDexie()
});
