import { supabaseAdmin } from '@/lib/sdks/supabase/client';

export const migrate = async () => supabaseAdmin().from('x').select('*');
