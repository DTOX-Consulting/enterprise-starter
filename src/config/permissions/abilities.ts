import { createMongoAbility, AbilityBuilder, subject } from '@casl/ability';

import {
  type TierName,
  type FeatureUser,
  tiers,
  type Features
} from '@/config/permissions/features';

export type AbilityUser = FeatureUser<
  TierName,
  {
    historyCount: number;
    businessCount: number;
    organizationCount: number;
  }
>;

type ShareMethod = keyof NonNullable<Features['sharingMethods']>;

const BasicBusinessFeatures = [
  'name',
  'image',
  'vision',
  'mission',
  'tagline',
  'industry',
  'description'
] as const;

type BusinessFeature = (typeof BasicBusinessFeatures)[number];

const LimitedBusinessFeatures = ['name', 'image'];

export const subjects = {
  viewHistory: (user: AbilityUser) => subject('History', user.meta),
  createBusiness: (user: AbilityUser) => subject('Business', user.meta),
  shareIdea: (_user: AbilityUser, shareMethod: ShareMethod) => subject('Idea', { shareMethod }),
  iterateBusinessFeature: (feature: BusinessFeature) => subject('BusinessFeature', { feature })
};

export const defineAbilitiesFor = (user: AbilityUser) => {
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  const tier = tiers[user.tier];

  const {features} = tier;

  // Teams allowed
  if (features.teamsAllowed) {
    can('create', 'Team');
  }

  // Idea refinement
  if (features.ideaRefinement) {
    can('refine', 'Idea');
  }

  if (features.aiSuggestions) {
    can('suggest', 'AIChanges');
  }

  // Business creation limit
  if (features.businessCreationLimit === 'unlimited') {
    can('create', 'Business');
  } else if (user.meta.businessCount < features.businessCreationLimit) {
    can('create', 'Business');
  }

  if (features.organizationLimit === 'unlimited') {
    can('create', 'Organization');
  } else if (user.meta.organizationCount < features.organizationLimit) {
    can('create', 'Organization');
  }

  // History limit
  if (features.historyLimit === 'unlimited') {
    can('view', 'History');
  } else if (user.meta.historyCount < features.historyLimit) {
    can('view', 'History');
  }
  // Iteration type
  if (features.iterationType === 'advanced') {
    can('iterate', 'BusinessFeature');
    can('iterate', 'BusinessFeatureNLP');
  } else if (features.iterationType === 'simplified') {
    can('iterate', 'BusinessFeature', {
      feature: { $in: BasicBusinessFeatures }
    });
  } else if (features.iterationType === 'limited') {
    can('iterate', 'BusinessFeature', {
      feature: { $in: LimitedBusinessFeatures }
    });
  }

  // Sharing type
  if (features.sharingType === 'advanced') {
    can('share', 'Idea', { shareMethod: 'oneTimePasscode' });
    can('share', 'Idea', { shareMethod: 'passwordProtection' });
    can('share', 'Idea', { shareMethod: 'emailRestrictions' });
  } else {
    can('share', 'Idea', { shareMethod: 'simple' });
  }

  return createMongoAbility(rules);
};
