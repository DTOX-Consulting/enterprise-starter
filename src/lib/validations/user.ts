import { object, string } from 'zod';

export const userNameSchema = object({
  name: string().min(3).max(32)
});
