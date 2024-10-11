import { ucFirst } from '@/lib/utils/string';

export type FeatureUser<
  TierNames extends string = string,
  Meta extends Record<string, unknown> = Record<string, unknown>
> = {
  id: string;
  tier: TierNames;
  meta: Meta;
};

export type StripeDetails = {
  amount: number;
  priceId: string;
  productId: string;
};

export type Tier<Features extends Record<string, unknown>> = {
  price: string;
  label: string;
  description: string;
  features: Features;
  buttonLabel: string;
  pricingFeatures: string[];
  kinde: {
    subscriptionPermissionsKey: string;
  };
  stripe: {
    test: StripeDetails;
    live: StripeDetails;
  };
};

export type TiersConfig<TierName extends string, Features extends Record<string, unknown>> = Record<
  TierName,
  Tier<Features>
>;

export type Features = {
  [x: string]: unknown;
};

export type TierName = 'none' | 'starter' | 'pro' | 'team';

export const tiers: TiersConfig<TierName, Features> = {
  none: {
    price: 'N/A',
    label: 'Free',
    description: 'No tier',
    buttonLabel: 'Get Started for Free',
    kinde: {
      subscriptionPermissionsKey: 'subscriptions-none'
    },
    stripe: {
      test: {
        amount: 0,
        priceId: 'price_1PTWQURt7fGl6tlNTCvzeipp',
        productId: 'prod_QKAmVBlD9IhudD'
      },
      live: {
        amount: 0,
        priceId: 'price_1PbhCMRt7fGl6tlNy1Cxxy0u',
        productId: 'prod_QScRO9bpGgl2S5'
      }
    },
    pricingFeatures: [],
    features: {
      businessCreationLimit: 1,
      organizationLimit: 1,
      teamsAllowed: false,
      aiSuggestions: false,
      iterationType: 'simplified',
      sharingType: 'simplified',
      ideaRefinement: true,
      historyLimit: 1,
      sharingMethods: {
        simple: true
      }
    }
  },
  starter: {
    price: 'Free',
    label: 'Starter',
    buttonLabel: 'Get Started for Free',
    description: 'Perfect for individuals',
    kinde: {
      subscriptionPermissionsKey: 'subscriptions-starter'
    },
    stripe: {
      test: {
        amount: 0,
        priceId: 'price_1PTWQURt7fGl6tlNTCvzeipp',
        productId: 'prod_QKAmVBlD9IhudD'
      },
      live: {
        amount: 0,
        priceId: 'price_1PbhCMRt7fGl6tlNy1Cxxy0u',
        productId: 'prod_QScRO9bpGgl2S5'
      }
    },
    pricingFeatures: [
      '1 business idea and organization',
      'Simple sharing',
      'Simplified AI iteration of your business',
      'Retain last edit per business feature'
    ],
    features: {
      businessCreationLimit: 1,
      organizationLimit: 1,
      teamsAllowed: false,
      aiSuggestions: false,
      iterationType: 'simplified',
      sharingType: 'simplified',
      ideaRefinement: true,
      historyLimit: 1,
      sharingMethods: {
        simple: true
      }
    }
  },
  pro: {
    price: '£9.99',
    label: 'Pro',
    buttonLabel: 'Be an Early Adopter',
    description: 'Perfect for pros',
    kinde: {
      subscriptionPermissionsKey: 'subscriptions-pro'
    },
    stripe: {
      test: {
        amount: 999,
        priceId: 'price_1PTWH6Rt7fGl6tlNIsAHGMJe',
        productId: 'prod_QKAcAp3lxNKGFc'
      },
      live: {
        amount: 999,
        priceId: 'price_1PbhCTRt7fGl6tlNq2SUBSvB',
        productId: 'prod_QScRMU9UOeclY5'
      }
    },
    pricingFeatures: ['All Starter features'],
    features: {
      businessCreationLimit: 3,
      organizationLimit: 3,
      teamsAllowed: false,
      aiSuggestions: true,
      iterationType: 'advanced',
      sharingType: 'advanced',
      ideaRefinement: true,
      historyLimit: 5,
      sharingMethods: {
        simple: true,
        oneTimePassCode: false,
        emailRestrictions: true,
        passwordProtection: false
      }
    }
  },
  team: {
    price: '£19.99',
    label: 'Team',
    buttonLabel: 'Be an Early Adopter',
    description: 'Perfect for teams',
    kinde: {
      subscriptionPermissionsKey: 'subscriptions-team'
    },
    stripe: {
      test: {
        amount: 1999,
        priceId: 'price_1PTWHsRt7fGl6tlNz6kVOvl0',
        productId: 'prod_QKAd11DF5qH3Xq'
      },
      live: {
        amount: 1999,
        priceId: 'price_1PbhCRRt7fGl6tlNpqBqizpN',
        productId: 'prod_QScREUXTtjOnaK'
      }
    },
    pricingFeatures: ['All Pro features', '24/7 online support'],
    features: {
      businessCreationLimit: 'unlimited',
      organizationLimit: 'unlimited',
      teamsAllowed: true,
      aiSuggestions: true,
      iterationType: 'advanced',
      sharingType: 'advanced',
      ideaRefinement: true,
      historyLimit: 20,
      sharingMethods: {
        simple: true,
        passwordProtection: true,
        oneTimePassCode: true,
        emailRestrictions: true
      }
    }
  }
};

export const getTier = (key: TierName) => tiers[key];

export const getTierLabel = (key: TierName) => ucFirst(tiers[key].label);

export const isProTier = (key?: TierName) => key === 'pro';

export const isTeamTier = (key?: TierName) => key === 'team';

export const isNoneTier = (key?: TierName) => key === 'none';

export const isStarterTier = (key?: TierName) => key === 'starter';

export const isPaidTier = (key?: TierName) => isProTier(key) || isTeamTier(key);

export const isFreeTier = (key?: TierName) => isNoneTier(key) || isStarterTier(key);

export const isValidTier = (key?: string): key is TierName => (key ? key in tiers : false);

export const getSubscriptionPermissionsKey = (key: TierName) =>
  tiers[key].kinde.subscriptionPermissionsKey;

export const getTierNameFromPermissionsKey = (permissions: string[]) => {
  const tier = Object.entries(tiers)
    .reverse()
    .find(([, { kinde }]) => permissions.includes(kinde.subscriptionPermissionsKey));

  return tier ? (tier[0] as TierName) : 'none';
};

export const getSubscriptionPermissionsKeyFromPermissions = (permissions: string[]) => {
  const tier = getTierNameFromPermissionsKey(permissions);
  return getSubscriptionPermissionsKey(tier);
};

export const convertPermissionsToArray = (roles?: { key?: string }[]) =>
  roles?.map((p) => p.key).filter(Boolean) ?? [];

export const defaultTier = 'none' as TierName;
export const tierOrderUI = ['starter', 'team', 'pro'] as TierName[];
export const defaultSubscriptionPermissionsKey =
  tiers[defaultTier].kinde.subscriptionPermissionsKey;
