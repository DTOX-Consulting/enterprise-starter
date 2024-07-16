import { getEnv } from '@/lib/env/env.mjs';

export const config = {
  auth: {
    url: getEnv('NEXT_PUBLIC_SUPABASE_URL'),
    key: getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
};
