import { createClient } from '@supabase/supabase-js';

import { config } from '@/lib/sdks/supabase/config';

export const supabase = createClient(config.auth.url, config.auth.key);
