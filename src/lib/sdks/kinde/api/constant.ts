import { defaultTier, defaultSubscriptionPermissionsKey } from '@/config/permissions/features';

import type { UserSession } from '@/lib/sdks/kinde/api/session';

export const defaultUserSession = () =>
  ({
    isAdmin: false,
    organization: null,
    user: {
      id: '',
      name: '',
      email: '',
      image: null,
      lastName: '',
      firstName: ''
    },
    subscription: {
      tier: defaultTier,
      key: defaultSubscriptionPermissionsKey
    },
    auth: {
      authenticated: false,
      token: undefined
    }
  }) as UserSession;
