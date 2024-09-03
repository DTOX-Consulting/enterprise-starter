import Replicate from 'replicate';

import { config } from '@/lib/sdks/replicate/config';

import type { GenericObject } from '@/lib/utils/object';

export const replicate = new Replicate({
  // get your token from https://replicate.com/account/api-tokens
  auth: config.REPLICATE_API_TOKEN // defaults to process.env.REPLICATE_API_TOKEN
});

export const api = async ({
  model,
  input
}: {
  model: `${string}/${string}` | `${string}/${string}:${string}`;
  input: GenericObject;
}) => {
  const output = await replicate.run(model, { input });
  console.log(output);
  return output;
};
