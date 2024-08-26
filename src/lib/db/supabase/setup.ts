import { supabaseAdmin } from '@/lib/sdks/supabase/client';

export const setup = async () => {
  return supabaseAdmin().from('businesses').select('*');
};
