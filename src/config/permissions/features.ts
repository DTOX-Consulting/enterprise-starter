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
  teamsAllowed: boolean;
  aiSuggestions: boolean;
  ideaRefinement: boolean;
  historyLimit: number | 'unlimited';
  organizationLimit: number | 'unlimited';
  businessCreationLimit: number | 'unlimited';
  iterationType: 'simplified' | 'advanced' | 'limited';
  sharingType: 'simplified' | 'advanced';
  sharingMethods: {
    simple?: boolean;
    passwordProtection?: boolean;
    oneTimePasscode?: boolean;
    emailRestrictions?: boolean;
  };
};

export type TierName = 'none' | 'starter' | 'pro' | 'team';

export const tiers: TiersConfig<TierName, Features> = {
  none: {
    price: 'N/A',
    label: 'None',
    description: 'No tier',
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
        priceId: 'price_1PTWQURt7fGl6tlNTCvzeipp',
        productId: 'prod_QKAmVBlD9IhudD'
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
      ideaRefinement: false,
      historyLimit: 0,
      sharingMethods: {
        simple: false
      }
    }
  },
  starter: {
    price: 'Free',
    label: 'Starter',
    description: 'Perfect for individuals in the research phase of their idea.',
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
        priceId: 'price_1PTWQURt7fGl6tlNTCvzeipp',
        productId: 'prod_QKAmVBlD9IhudD'
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
    description: 'Perfect for individuals looking to do more with their business idea.',
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
        priceId: 'price_1PTWH6Rt7fGl6tlNIsAHGMJe',
        productId: 'prod_QKAcAp3lxNKGFc'
      }
    },
    pricingFeatures: [
      'All Starter features',
      '3 business ideas',
      '3 organizations',
      'Advanced sharing',
      'Automatic AI suggestions',
      'Advanced AI iteration of your business',
      'Retain last 5 edits per business feature'
    ],
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
        oneTimePasscode: false,
        emailRestrictions: true,
        passwordProtection: false
      }
    }
  },
  team: {
    price: '£19.99',
    label: 'Team',
    description: 'Perfect for teams looking to collaborate and grow their business.',
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
        priceId: 'price_1PTWHsRt7fGl6tlNz6kVOvl0',
        productId: 'prod_QKAd11DF5qH3Xq'
      }
    },
    pricingFeatures: [
      'All Pro features',
      'Unlimited business ideas',
      'Unlimited organizations',
      'Realtime collaboration',
      'Advanced Auto AI suggestions',
      'Retain last 20 edits per business feature',
      '24/7 online support'
    ],
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
        oneTimePasscode: true,
        emailRestrictions: true
      }
    }
  }
};

export const getTier = (key: TierName) => tiers[key];

export const isNoneTier = (key: TierName) => key === 'none';

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
