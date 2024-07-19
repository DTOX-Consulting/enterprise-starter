'use client';

import { G } from '@mobily/ts-belt';
import { ToastAction } from '@radix-ui/react-toast';
import { each } from 'already';
import { type MouseEventHandler, useCallback } from 'react';

import { toast } from '@/components/ui/organisms/toast/use-toast';
import { useDBData } from '@/data';
import { useRxDBCollection } from '@/lib/db/rxdb/hooks';
import { useAuth } from '@/lib/hooks/use-auth';

import type {
  PartialBusinessWithIds,
  BusinessChangeFLKeys,
  BusinessChangeSLKeys
} from '@/data/guards';
import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { History } from '@/lib/db/rxdb/schemas/history';
import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { Organization } from '@/lib/db/rxdb/schemas/organization';
import type { DCS, PCS, PNCS, NCSNO } from '@/lib/db/rxdb/utils/schema';
import type { GenericFunction } from '@/lib/utils/function';
import type { GenericObject } from '@/lib/utils/object';

export function useDBDataMutation() {
  const { userId: ownerId } = useAuth();
  const { createHistory } = useDBDataExtrasMutation();
  const { currentOrganization, businesses } = useDBData();

  const businessMutations = useRxDBCollection('business');
  const organizationMutations = useRxDBCollection('organization');

  const deleteBusiness = useCallback(
    (business: DCS<Business>): MouseEventHandler<SVGSVGElement> =>
      (e) => {
        e.stopPropagation();
        e.preventDefault();

        toast({
          variant: 'destructive',
          title: `Delete ${business.name}`,
          description: 'Are you sure you want to delete?',
          action: (
            <ToastAction
              altText="Delete"
              onClick={async () => businessMutations.remove(business.id)}
            >
              Delete
            </ToastAction>
          )
        });
      },
    [businessMutations]
  );

  const shareBusiness = useCallback(
    (business: DCS<Business>): MouseEventHandler<SVGSVGElement> =>
      (e) => {
        e.stopPropagation();
        e.preventDefault();

        toast({
          title: `Share ${business.name}`,
          description: (
            <div>
              <p>Are you sure you want to share with others?</p>
              <p className="text-xs italic">** note: sharing creates a public url **</p>
            </div>
          ),
          action: (
            <ToastAction
              altText="Share"
              onClick={() => {
                toast({ title: 'Sharing Feature', description: 'Coming soon!' });
              }}
            >
              Share
            </ToastAction>
          )
        });
      },
    []
  );

  const transferBusiness = useCallback(
    (business: DCS<Business>, organization: DCS<Organization>) => {
      toast({
        title: `Transferring ${business.name}`,
        description: 'Are you sure you want to transfer?',
        action: (
          <ToastAction
            altText="Transfer"
            onClick={async () =>
              businessMutations.modify(business.id, { organizationId: organization.id })
            }
          >
            Transfer
          </ToastAction>
        )
      });
    },
    [businessMutations]
  );

  const createBusinessHistory = useCallback(
    async (id: string, data?: PCS<Business> | null) =>
      G.isNotNullable(data) &&
      createHistory({
        ...data,
        id,
        organizationId: data.organizationId ?? currentOrganization?.id ?? ''
      }),
    [createHistory, currentOrganization]
  );

  const createBusiness = useCallback(
    async (business: NCSNO<Business>) => businessMutations.insert({ ...business, ownerId }),
    [businessMutations, ownerId]
  );

  const updateBusiness = useCallback(
    async (id: string, business: PNCS<Business>) => {
      const newBusiness = await businessMutations.modify(id, business);
      await createBusinessHistory(id, business);
      return newBusiness;
    },
    [businessMutations, createBusinessHistory]
  );

  const createOrganization = useCallback(
    async (organization: NCSNO<Organization>) =>
      organizationMutations.insert({ ...organization, ownerId }),
    [organizationMutations, ownerId]
  );

  const updateOrganization = useCallback(
    async (id: string, organization: PNCS<Organization>) =>
      organizationMutations.modify(id, organization),
    [organizationMutations]
  );

  const deleteOrganizationBusinesses = useCallback(
    async (organization: DCS<Organization>) => {
      await each(businesses, async (business) => {
        if (business.organizationId === organization.id) {
          await businessMutations.remove(business.id);
        }
      });
    },
    [businessMutations, businesses]
  );

  const deleteOrganization = useCallback(
    (organization: DCS<Organization>, fn?: GenericFunction) => {
      toast({
        variant: 'destructive',
        title: `Delete ${organization.name}`,
        description: 'Are you sure you want to delete?',
        action: (
          <ToastAction
            altText="Delete"
            onClick={() => {
              void organizationMutations.remove(organization.id);
              void deleteOrganizationBusinesses(organization);
              fn?.();
            }}
          >
            Delete
          </ToastAction>
        )
      });
    },
    [organizationMutations, deleteOrganizationBusinesses]
  );

  return {
    shareBusiness,
    createBusiness,
    deleteBusiness,
    updateBusiness,
    transferBusiness,
    createOrganization,
    updateOrganization,
    deleteOrganization
  };
}

export function useDBDataExtrasMutation() {
  const { userId: ownerId } = useAuth();
  const historyMutations = useRxDBCollection('history');
  const notificationMutations = useRxDBCollection('notification');

  const updateHistory = useCallback(
    async (id: string, data: PNCS<History>) => historyMutations.modify(id, data),
    [historyMutations]
  );

  const updateNotification = useCallback(
    async (id: string, data: PNCS<Notification>) => notificationMutations.modify(id, data),
    [notificationMutations]
  );

  const createNotification = useCallback(
    async (notification: NCSNO<Notification>) =>
      notificationMutations.insert({ ...notification, ownerId }),
    [notificationMutations, ownerId]
  );

  const setNotificationRead = useCallback(
    async (id: string, isRead = true) =>
      updateNotification(id, { readAt: isRead ? new Date().toISOString() : undefined }),
    [updateNotification]
  );

  const setNotificationRemoved = useCallback(
    async (id: string, isRemoved = true) =>
      updateNotification(id, { removedAt: isRemoved ? new Date().toISOString() : undefined }),
    [updateNotification]
  );

  const createHistory = useCallback(
    async (business: PartialBusinessWithIds) => {
      const createBusinessChange = async <
        T extends BusinessChangeFLKeys | BusinessChangeSLKeys,
        D extends Partial<GenericObject<T>> = Partial<GenericObject<T>>
      >(
        keys: T[],
        data?: D
      ) => {
        await each(keys, async (key) => {
          if (G.isNullable(data) || G.isNullable(data[key])) {
            return;
          }

          await historyMutations.insert({
            key,
            ownerId,
            businessId: business.id,
            organizationId: business.organizationId,
            value: { data: data[key] }
          });
        });
      };

      if (!business.id) {
        throw new Error('No Business ID Found');
      }

      if (!business.organizationId) {
        throw new Error('No Organization ID Found');
      }

      await createBusinessChange<BusinessChangeFLKeys>(['name', 'image', 'description'], business);
      await createBusinessChange<BusinessChangeSLKeys>(
        ['vision', 'mission', 'problem', 'tagline', 'industry'],
        business.data
      );
    },
    [historyMutations, ownerId]
  );

  return {
    createHistory,
    updateHistory,
    createNotification,
    updateNotification,
    setNotificationRead,
    setNotificationRemoved
  };
}
