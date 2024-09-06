'use client';

import { useCallback } from 'react';

import {
  historyAtom,
  currentHistoryAtom,
  organizationsAtom,
  currentOrganizationAtom,
  notificationsAtom,
  currentNotificationAtom
} from '@/data/migration/atoms';
import { useData } from '@/lib/hooks/use-data';

import type {
  PreviousDataHistory,
  PreviousDataNotification,
  PreviousDataOrganization
} from '@/data/migration/types';

export function useOrganization() {
  const hooks = useData<PreviousDataOrganization>({
    retrieveOnMount: true,
    dataAtom: organizationsAtom,
    storageKeyPrefix: 'organization',
    currentDataAtom: currentOrganizationAtom
  });

  const getBusinessOrgId = useCallback(
    (id: string): string | undefined => {
      const org = hooks.data.find((org) => org.businesses?.find((b) => b.id === id));
      return org?.id;
    },
    [hooks.data]
  );

  return {
    getBusinessOrgId,
    organizations: hooks.data,
    setOrganizations: hooks.setData,
    createOrganization: hooks.createData,
    updateOrganization: hooks.updateData,
    deleteOrganization: hooks.deleteData,
    currentOrganization: hooks.currentData,
    setCurrentOrganization: hooks.setCurrentData,
    setCurrentOrganizationByName: hooks.setCurrentDataByName
  };
}

export function useNotification() {
  const hooks = useData<PreviousDataNotification>({
    retrieveOnMount: true,
    dataAtom: notificationsAtom,
    storageKeyPrefix: 'notification',
    currentDataAtom: currentNotificationAtom
  });

  return {
    notifications: hooks.data,
    setNotifications: hooks.setData,
    createNotification: hooks.createData,
    updateNotification: hooks.updateData,
    deleteNotification: hooks.deleteData,
    currentNotification: hooks.currentData,
    setCurrentNotification: hooks.setCurrentData,
    setCurrentNotificationByName: hooks.setCurrentDataByName
  };
}

export function useHistory() {
  const hooks = useData<PreviousDataHistory>({
    retrieveOnMount: true,
    dataAtom: historyAtom,
    storageKeyPrefix: 'history',
    currentDataAtom: currentHistoryAtom
  });

  return {
    histories: hooks.data,
    setHistories: hooks.setData,
    createHistory: hooks.createData,
    updateHistory: hooks.updateData,
    deleteHistory: hooks.deleteData,
    currentHistory: hooks.currentData,
    setCurrentHistory: hooks.setCurrentData,
    setCurrentHistoryByName: hooks.setCurrentDataByName
  };
}
