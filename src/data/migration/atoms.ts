import { atom } from 'jotai';

import type {
  PreviousDataHistory,
  PreviousDataNotification,
  PreviousDataOrganization
} from '@/data/migration/types';

export const organizationsAtom = atom<PreviousDataOrganization[]>([]);
export const currentOrganizationAtom = atom<PreviousDataOrganization | null>(null);

export const historyAtom = atom<PreviousDataHistory[]>([]);
export const currentHistoryAtom = atom<PreviousDataHistory | null>(null);

export const notificationsAtom = atom<PreviousDataNotification[]>([]);
export const currentNotificationAtom = atom<PreviousDataNotification | null>(null);
