import { fromPromise } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';

export const getUser = async () => {
  return fromPromise(
    drive.about
      .get({
        fields: 'user,storageQuota'
      })
      .then(({ data }) => data)
  );
};
