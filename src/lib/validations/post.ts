import { object, string, any } from 'zod';

export const postPatchSchema = object({
  title: string().min(3).max(128).optional(),
  content: any().optional()
});
