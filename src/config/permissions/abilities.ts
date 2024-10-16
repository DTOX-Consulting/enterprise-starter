import { createMongoAbility, AbilityBuilder, subject } from '@casl/ability';
import { G } from '@mobily/ts-belt';

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

  if (G.isNotNullable(features)) {
    can('create', 'Entity');
  }

  return createMongoAbility(rules);
};
