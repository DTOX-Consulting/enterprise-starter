export type FeatureFlag<T = unknown> = {
  value: T;
  name: string;
  enabled: boolean;
};

export const NEEDS_AUTH: FeatureFlag<boolean> = {
  value: true,
  enabled: true,
  name: 'NEEDS_AUTH'
};

export const FEATURE_FLAGS = {
  NEEDS_AUTH
} as const;

type FeatureFlagType = typeof FEATURE_FLAGS;
type FeatureFlagName = keyof FeatureFlagType;

export const getFFValue = <I extends FeatureFlagName = FeatureFlagName, T = FeatureFlagType[I]>(
  name: I
): FeatureFlag<T>['value'] | undefined => {
  const flag = FEATURE_FLAGS[name] as FeatureFlag<T>;

  if (!flag.enabled) {
    return undefined;
  }

  return flag.value;
};
