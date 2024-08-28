import { createClient } from '@supabase/supabase-js';

import { config } from '@/lib/sdks/supabase/config';

import type { UserSession } from '@/lib/sdks/kinde/api/session';

export const supabase = (userSession: UserSession) => {
  if (!userSession.auth.idToken) {
    throw new Error('User must be authenticated to create a Supabase client');
  }

  return createClient(config.auth.url, config.auth.key, {
    // global: {
    //   headers: {
    //     Authorization: `Bearer ${userSession.auth.idToken}`
    //   }
    // }
  });
};

export const supabaseAdmin = () => createClient(config.auth.url, config.auth.key);
