'use client';

import { useRouter } from 'next/navigation';
import { useMemo, type FC } from 'react';

import LoadingDots from '@/components/ui/organisms/icons/loading-dots';
import { createPath } from '@/config/navigation';
import { useNavigation } from '@/config/navigation/use-navigation';
import { useDBDataMutation, useDBData } from '@/data';
import { useDebounceEffect } from '@/lib/hooks/use-debounce';

import type { PartialBusinessWithIds } from '@/data/guards';
import type { SchemaDocument } from '@/lib/db/rxdb/schemas';
import type { Business, CompanyStatements } from '@/lib/db/rxdb/schemas/business';
import type { History } from '@/lib/db/rxdb/schemas/history';
import type { DCS, PNCSNO } from '@/lib/db/rxdb/utils/schema';

export type UpdateBusiness = (
  id: string,
  business: PNCSNO<Business>
) => Promise<SchemaDocument<'business'> | null>;

export type CreateBusiness = (
  companyStatements: CompanyStatements,
  logo?: string
) => Promise<SchemaDocument<'business'> | null>;

export type CreateHistory = (business: PartialBusinessWithIds) => Promise<void>;

export type GetRandomLogo = ({
  business
}: { business: DCS<Business> }) => Promise<string | undefined>;

export type UpdateHistory = (
  id: string,
  business: PNCSNO<History>
) => Promise<SchemaDocument<'history'> | null>;

export type BusinessComponentWrapperProps<P = unknown> = P & {
  business: DCS<Business>;
  updateBusiness: UpdateBusiness;
};

export function BusinessComponentWrapper<P>({
  Component,
  props
}: {
  Component: FC<BusinessComponentWrapperProps<typeof props>>;
  props?: P;
}) {
  const { currentBusiness } = useDBData();
  const { updateBusiness } = useDBDataMutation();

  const Comp = useMemo(
    () => (
      <Component
        {...(props as P)}
        updateBusiness={updateBusiness}
        business={currentBusiness as BusinessComponentWrapperProps<P>['business']}
      />
    ),
    [Component, props, currentBusiness, updateBusiness]
  );

  if (!currentBusiness) {
    return null;
  }

  return Comp;
}

export function useBusinessLoader() {
  const { path } = useNavigation();
  const { currentBusiness } = useDBData();

  if (!path.businessId || currentBusiness) {
    return null;
  }

  return (
    <div className="mx-auto flex h-1/3 w-full items-center justify-center">
      <LoadingDots />
    </div>
  );
}

export function useBusinessRouteValidator() {
  const router = useRouter();
  const { path } = useNavigation();
  const { isReady, getBusiness, getOrganization } = useDBData();

  useDebounceEffect(
    'set-current-organization',
    () => {
      if (!isReady) return;
      const { orgId, businessId } = path;
      if (!orgId || !businessId) return;

      const business = getBusiness(businessId);
      const organization = getOrganization(orgId);

      if (business && organization) return;

      router.push(createPath({ base: 'businesses' }));
    },
    [router, isReady, getBusiness, getOrganization]
  );
}
