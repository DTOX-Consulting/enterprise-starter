import arcjet, {
  type ArcjetMode,
  type ArcjetOptions,
  type Primitive,
  type Product
} from '@arcjet/next';

import { getEnv } from '@/lib/env';

export const config = {
  key: getEnv('ARCJET_KEY'),
  mode: getEnv('ARCJET_MODE', 'DRY_RUN') as ArcjetMode
};

type Options<Rules extends (Primitive | Product)[]> = Omit<ArcjetOptions<Rules>, 'key'>;

export const createArcjet = <const Rules extends (Primitive | Product)[]>(
  options: Options<Rules>
) => {
  return arcjet({
    key: config.key,
    ...options
  });
};
