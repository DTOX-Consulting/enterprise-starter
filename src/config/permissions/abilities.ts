import { createMongoAbility, AbilityBuilder, subject } from '@casl/ability';

import { type TierName, type FeatureUser, tiers } from '@/config/permissions/features';

export type AbilityUser = FeatureUser<
  TierName,
  {
    [x: string]: number;
  }
>;

export const subjects = {
  createEntity: (entity: string, user: AbilityUser) => subject(entity, user.meta)
};

export const defineAbilitiesFor = (user: AbilityUser) => {
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  const tier = tiers[user.tier];

  const { features } = tier;

  if (features.teamsAllowed) {
    can('create', 'Team');
  }

  return createMongoAbility(rules);
};
