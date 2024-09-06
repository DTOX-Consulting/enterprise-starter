import { supabaseAdmin } from '@/lib/sdks/supabase/client';

export const setup = async () => supabaseAdmin().from('businesses').select('*');
