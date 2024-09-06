import { object, string } from 'zod';

export const userAuthSchema = object({
  email: string().email()
});
