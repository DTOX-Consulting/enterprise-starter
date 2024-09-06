'use client';

import { type AbilityUser, defineAbilitiesFor } from '@/config/permissions/abilities';
import { defaultTier, getTier, type TierName } from '@/config/permissions/features';
import { useDBData } from '@/data';
import { useAuth } from '@/lib/hooks/use-auth';

import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { Organization } from '@/lib/db/rxdb/schemas/organization';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

export function useAbilities() {
  const auth = useAuth();
  const { businesses, organizations } = useDBData();

  const abilities = defineAbilities({
    auth,
    businesses,
    organizations
  });

  const currentTier = auth.subscription?.tier ?? defaultTier;
  const { price, features } = getTier(currentTier);

  return {
    price,
    features,
    abilities,
    tier: currentTier,
    abilitiesReady: !!auth.user?.id,
    isTier: (tier: TierName) => currentTier === tier,
    getFeature: (feature: keyof typeof features) => features[feature]
  };
}

const defineAbilities = ({
  auth,
  businesses,
  organizations
}: {
  auth: ReturnType<typeof useAuth>;
  businesses: DCS<Business>[];
  organizations: DCS<Organization>[];
}) => {
  const abilityUser: AbilityUser = {
    id: auth.user?.id ?? '',
    tier: auth.subscription?.tier ?? defaultTier,
    meta: {
      historyCount: 0,
      businessCount: businesses.length ?? 0,
      organizationCount: organizations.length ?? 0
    }
  };

  return defineAbilitiesFor(abilityUser);
};
