import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';

import type { RxStorage } from 'rxdb';

export const addValidation = <T, K>(storage: RxStorage<T, K>) =>
  wrappedValidateAjvStorage({
    storage
  });
