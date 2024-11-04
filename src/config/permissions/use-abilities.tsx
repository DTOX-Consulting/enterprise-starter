'use client';

import { G } from '@mobily/ts-belt';

import { type AbilityUser, defineAbilitiesFor } from '@/config/permissions/abilities';
import { defaultTier, getTier, type TierName } from '@/config/permissions/features';
import { useAuth } from '@/lib/hooks/use-auth';

export function useAbilities() {
  const auth = useAuth();

  const abilities = defineAbilities({
    auth
  });

  const currentTier = auth.subscription?.tier ?? defaultTier;
  const { price, features } = getTier(currentTier);

  return {
    price,
    features,
    abilities,
    tier: currentTier,
    abilitiesReady: G.isNotNullable(auth.user?.id),
    isTier: (tier: TierName) => currentTier === tier,
    getFeature: (feature: keyof typeof features) => features[feature]
  };
}

const defineAbilities = ({
  auth
}: {
  auth: ReturnType<typeof useAuth>;
}) => {
  const abilityUser: AbilityUser = {
    id: auth.user?.id ?? '',
    tier: auth.subscription?.tier ?? defaultTier,
    meta: {}
  };

  return defineAbilitiesFor(abilityUser);
};
