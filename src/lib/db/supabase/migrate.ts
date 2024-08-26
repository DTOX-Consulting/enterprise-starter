import { supabaseAdmin } from '@/lib/sdks/supabase/client';

export const migrate = async () => {
  return supabaseAdmin().from('businesses').select('*');
};
