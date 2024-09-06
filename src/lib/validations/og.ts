import { object, string, enum } from 'zod';

export const ogImageSchema = object({
  heading: string(),
  type: string(),
  mode: enum(['light', 'dark']).default('dark')
});
