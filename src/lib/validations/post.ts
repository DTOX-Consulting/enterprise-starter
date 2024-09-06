import { object, string, any } from 'zod';

export const postPatchSchema = object({
  title: string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: any().optional()
});
