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

  const { result: bizResult } = useRxDBData('business', (collection) => {
    return collection.find().where('ownerId').equals(userId);
  });

  const { result: orgResult } = useRxDBData('organization', (collection) => {
    return collection.find().where('ownerId').equals(userId);
  });

  const businesses = useMemo(() => bizResult.map((biz) => biz.toJSON()), [bizResult]);
  const organizations = useMemo(() => orgResult.map((org) => org.toJSON()), [orgResult]);

  const currentOrganization = useMemo(
    () => organizations.find(({ id }) => id === path.orgId),
    [organizations, path.orgId]
  );

  const defaultOrganization = useMemo(
    () => organizations.find((org) => defaultNames.includes(org.name)) ?? organizations[0],
    [organizations]
  );

  const currentBusinesses = useMemo(
    () => businesses.filter(({ organizationId }) => organizationId === path.orgId),
    [businesses, path.orgId]
  );

  const currentBusiness = useMemo(
    () => currentBusinesses.find(({ id }) => id === path.businessId),
    [currentBusinesses, path.businessId]
  );

  const filterBusinesses = useCallback(
    (search: string, filter: string) => {
      return currentBusinesses
        .filter((business) => {
          if (search) {
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
        });
    },
    [currentBusinesses]
  );

  const getBusiness = useCallback(
    (businessId: string) => {
      return businesses.find(({ id }) => id === businessId);
    },
    [businesses]
  );

  const getOrganization = useCallback(
    (organizationId: string) => {
      return organizations.find(({ id }) => id === organizationId);
    },
    [organizations]
  );

  return {
    isReady,
    businesses,
    getBusiness,
    organizations,
    getOrganization,
    currentBusiness,
    filterBusinesses,
    currentBusinesses,
    currentOrganization,
    defaultOrganization
  };
}

export function useDBDataExtras() {
  const { userId } = useAuth();

  const { result: historyResult } = useRxDBData('history', (collection) => {
    return collection.find().where('ownerId').equals(userId);
  });

  const { result: notificationResult } = useRxDBData('notification', (collection) => {
    return collection.find().where('ownerId').equals(userId);
  });

  const history = useMemo(() => historyResult.map((history) => history.toJSON()), [historyResult]);

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
    notifications
  };
}
