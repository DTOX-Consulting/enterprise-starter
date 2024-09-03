import { generateImageUrl, type ImageUrlParams } from '@/lib/sdks/pollinations/utils';
import { proxy } from '@/lib/utils/request';

export const pollinations = async (params: ImageUrlParams) => {
  const url = generateImageUrl(params);
  return proxy({ url });
};
