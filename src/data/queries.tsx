'use client';

import { differenceInMilliseconds } from 'date-fns';
import { useCallback, useMemo } from 'react';

import { useNavigation } from '@/config/navigation/use-navigation';
import { useRxDBData } from '@/lib/db/rxdb/hooks';
import { useAuth } from '@/lib/hooks/use-auth';
import { useAtom } from '@/lib/state/atoms';

import type { HistoryFilters } from '@/lib/db/rxdb/schemas/history';

const defaultNames = ['Default', 'Personal'];

export function useDBData() {
  const { userId } = useAuth();
  const { path } = useNavigation();
  const [isReady] = useAtom('dbInitializedAtom');

  const { result: bizResult } = useRxDBData('business', (collection) =>
    collection.find().where('ownerId').equals(userId)
  );

  const { result: orgResult } = useRxDBData('organization', (collection) =>
    collection.find().where('ownerId').equals(userId)
  );

  const businesses = useMemo(() => bizResult.map((biz) => biz.toJSON()), [bizResult]);
  const organizations = useMemo(() => orgResult.map((org) => org.toJSON()), [orgResult]);

  const getBusiness = useCallback(
    (businessId: string) => businesses.find(({ id }) => id === businessId),
    [businesses]
  );

  const getOrganization = useCallback(
    (organizationId: string) => organizations.find(({ id }) => id === organizationId),
    [organizations]
  );

  const getBusinessBySlug = useCallback(
    (businessSlug: string) => businesses.find(({ slug }) => slug === businessSlug),
    [businesses]
  );

  const current = useMemo(() => {
    if (path.slug && path.slug.length > 0) {
      const business = getBusinessBySlug(path.slug);
      const organization = business ? getOrganization(business.organizationId) : undefined;
      return { business, organization };
    }

    const business = path.businessId && path.businessId.length > 0 ? getBusiness(path.businessId) : undefined;
    const organization = path.orgId && path.orgId.length > 0 ? getOrganization(path.orgId) : undefined;
    return { business, organization };
  }, [path.slug, path.orgId, path.businessId, getBusiness, getOrganization, getBusinessBySlug]);

  const currentBusinesses = useMemo(
    () => businesses.filter(({ organizationId }) => organizationId === current.organization?.id),
    [businesses, current.organization?.id]
  );

  const currentBusiness = useMemo(
    () => currentBusinesses.find(({ id }) => id === current.business?.id),
    [currentBusinesses, current.business?.id]
  );

  const currentOrganization = useMemo(
    () => organizations.find(({ id }) => id === current.organization?.id),
    [organizations, current.organization?.id]
  );

  const defaultOrganization = useMemo(
    () => organizations.find((org) => defaultNames.includes(org.name)) ?? organizations[0],
    [organizations]
  );

  const filterBusinesses = useCallback(
    (search: string, filter: string) =>
      currentBusinesses
        .filter((business) => {
          if (search && search.length > 0) {
            return business.name.toLowerCase().includes(search.toLowerCase());
          }

          return true;
        })
        .sort((a, b) => {
          if (filter === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }

          if (filter === 'changed') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          }

          if (filter === 'name') {
            return a.name.localeCompare(b.name);
          }

          return 0;
        }),
    [currentBusinesses]
  );

  return {
    isReady,
    businesses,
    getBusiness,
    organizations,
    getOrganization,
    currentBusiness,
    filterBusinesses,
    getBusinessBySlug,
    currentBusinesses,
    currentOrganization,
    defaultOrganization
  };
}

export function useDBDataExtras() {
  const { userId } = useAuth();

  const { result: historyResult } = useRxDBData('history', (collection) =>
    collection.find().where('ownerId').equals(userId)
  );

  const { result: userMetaResult } = useRxDBData('user_meta', (collection) =>
    collection.find().where('ownerId').equals(userId)
  );

  const { result: notificationResult } = useRxDBData('notification', (collection) =>
    collection.find().where('ownerId').equals(userId)
  );

  const history = useMemo(() => historyResult.map((history) => history.toJSON()), [historyResult]);

  const userMeta = useMemo(() => userMetaResult.map((meta) => meta.toJSON()), [userMetaResult]);

  const notifications = useMemo(
    () => notificationResult.map((notification) => notification.toJSON()),
    [notificationResult]
  );

  const getHistory = useCallback(
    (businessId: string, filters?: HistoryFilters) =>
      history
        .filter((item) => {
          if (item.businessId !== businessId) {
            return false;
          }

          if (filters?.keys && !filters.keys.includes(item.key)) {
            return false;
          }

          if (
            filters?.date &&
            differenceInMilliseconds(new Date(item.createdAt), new Date(filters.date)) < 0
          ) {
            return false;
          }

          return true;
        })
        .reverse(),
    [history]
  );

  return {
    history,
    getHistory,
    notifications,
    userMeta: userMeta.at(0)
  };
}
