import { fromPromise } from '@/lib/route/utils';
import { drive } from '@/lib/sdks/google/auth';

export const getUser = async () => {
  try {
    const response = await drive.about.get({
      fields: 'user,storageQuota'
    });
    return await fromPromise(Promise.resolve(response.data));
  } catch (error) {
    console.error('Error getting user:', error);
    throw error; // Rethrow or handle the error appropriately
  }
};
