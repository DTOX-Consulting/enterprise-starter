'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { G } from '@mobily/ts-belt';
import { each } from 'already';
import { Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/atoms/button';
import {
  Form,
  useForm,
  FormItem,
  FormField,
  FormControl,
  FormMessage
} from '@/components/ui/atoms/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from '@/components/ui/atoms/select';
import { Modal } from '@/components/ui/molecules/modal';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { createPath } from '@/config/navigation';
import { isPaidTier } from '@/config/permissions/features';
import { useDBData } from '@/data';
import { useAnalytics } from '@/lib/analytics/provider';
import { useRxDBCollection } from '@/lib/db/rxdb/hooks';
import {
  companyStatementsToBusiness,
  type Business,
  type BusinessImages,
  type CompanyStatements
} from '@/lib/db/rxdb/schemas/business';
import { useAuth } from '@/lib/hooks/use-auth';
import { slugify } from '@/lib/utils/id';

import type {
  PartialBusinessWithIds,
  BusinessChangeFLKeys,
  BusinessChangeSLKeys,
  BusinessChangeSLCoreKeys,
  BusinessChangeSLImagesKeys
} from '@/data/guards';
import type { History } from '@/lib/db/rxdb/schemas/history';
import type { Notification } from '@/lib/db/rxdb/schemas/notification';
import type { Organization } from '@/lib/db/rxdb/schemas/organization';
import type { UserMeta } from '@/lib/db/rxdb/schemas/user-meta';
import type { DCS, PNCS, NCS, PDCSI } from '@/lib/db/rxdb/utils/schema';
import type { GenericFunction } from '@/lib/utils/function';
import type { GenericObject } from '@/lib/utils/object';

export function useDBDataMutation() {
  const { subscription } = useAuth();
  const analyticsManager = useAnalytics();
  const { currentOrganization, businesses } = useDBData();
  const provideSuggestions = isPaidTier(subscription?.tier);

  const businessMutations = useRxDBCollection('business');
  const organizationMutations = useRxDBCollection('organization');

  const insertBusiness = useCallback(
    async (business: NCS<Business>) => {
      const newBiz = await businessMutations.insert(business);
      analyticsManager.trackEvent(
        {
          category: 'business',
          action: 'create',
          object: 'business'
        },
        { businessId: newBiz.id, name: newBiz.name }
      );

      return newBiz;
    },
    [businessMutations.insert, analyticsManager]
  );

  const modifyBusiness = useCallback(
    async (id: string, business: PNCS<Business>) => {
      const modified = await businessMutations.modify(id, business);

      analyticsManager.trackEvent(
        {
          category: 'business',
          action: 'update',
          object: 'business'
        },
        { businessId: id }
      );

      return modified;
    },
    [businessMutations.modify, analyticsManager]
  );

  const transferBusiness = useCallback(
    async (businessId: string, organizationId: string, fn?: GenericFunction) => {
      await modifyBusiness(businessId, { organizationId });
      fn?.();
      analyticsManager.trackEvent(
        {
          category: 'business',
          action: 'transfer',
          object: 'business'
        },
        { businessId, organizationId }
      );
    },
    [modifyBusiness, analyticsManager]
  );

  const shareBusiness = useCallback(
    async (business: DCS<Business>) => {
      toast({
        title: 'Sharing Feature',
        description: 'Coming soon!'
      });

      await Promise.resolve();
      analyticsManager.trackEvent(
        {
          category: 'business',
          action: 'share',
          object: 'business'
        },
        { businessId: business.id, name: business.name }
      );
    },
    [analyticsManager]
  );

  const createBusiness = useCallback(
    async (companyStatements: CompanyStatements, images?: BusinessImages) => {
      if (!currentOrganization?.id) {
        throw new Error('No Current Organization Found');
      }

      const business = companyStatementsToBusiness({
        organizationId: currentOrganization.id,
        provideSuggestions,
        companyStatements,
        images
      });

      const newBusiness = await insertBusiness(business);
      return newBusiness;
    },
    [currentOrganization?.id, insertBusiness, provideSuggestions]
  );

  const updateBusiness = useCallback(
    async (id: string, business: PNCS<Business>) => {
      const currentBiz = businesses.find((biz) => biz.id === id);
      const slug =
        business.slug ??
        currentBiz?.slug ??
        (currentBiz?.name ? slugify(currentBiz.name) : undefined);

      return modifyBusiness(id, {
        ...business,
        slug
      });
    },
    [modifyBusiness, businesses]
  );

  const createOrganization = useCallback(
    async (organization: NCS<Organization>) => {
      const newOrg = await organizationMutations.insert(organization);
      analyticsManager.trackEvent(
        {
          category: 'organization',
          action: 'create',
          object: 'organization'
        },
        { organizationId: newOrg.id, name: newOrg.name }
      );

      return newOrg;
    },
    [organizationMutations.insert, analyticsManager]
  );

  const updateOrganization = useCallback(
    async (id: string, organization: PNCS<Organization>) => {
      await organizationMutations.modify(id, organization);
    },
    [organizationMutations.modify]
  );

  const deleteBusiness = useCallback(
    async (business: DCS<Business>) => {
      await businessMutations.remove(business.id);
      analyticsManager.trackEvent(
        {
          category: 'business',
          action: 'delete',
          object: 'business'
        },
        { businessId: business.id, name: business.name }
      );
    },
    [businessMutations.remove, analyticsManager]
  );

  const deleteOrganizationBusinesses = useCallback(
    async (organization: DCS<Organization>) => {
      await each(businesses, async (business) => {
        if (business.organizationId === organization.id) {
          await businessMutations.remove(business.id);
        }
      });
    },
    [businessMutations.remove, businesses]
  );

  const deleteOrganization = useCallback(
    async (organization: DCS<Organization>) => {
      await deleteOrganizationBusinesses(organization);
      await organizationMutations.remove(organization.id);

      analyticsManager.trackEvent(
        {
          category: 'organization',
          action: 'delete',
          object: 'organization'
        },
        { organizationId: organization.id, name: organization.name }
      );
    },
    [deleteOrganizationBusinesses, organizationMutations.remove, analyticsManager]
  );

  return {
    shareBusiness,
    deleteBusiness,
    createBusiness,
    updateBusiness,
    transferBusiness,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    deleteOrganizationBusinesses
  };
}

export function useDBDataExtrasMutation() {
  const historyMutations = useRxDBCollection('history');
  const userMetaMutations = useRxDBCollection('user_meta');
  const notificationMutations = useRxDBCollection('notification');
  const analyticsManager = useAnalytics();

  const updateHistory = useCallback(
    async (id: string, data: PNCS<History>) => {
      await historyMutations.modify(id, data);
      analyticsManager.trackEvent(
        {
          category: 'history',
          action: 'update',
          object: 'history'
        },
        { historyId: id }
      );
    },
    [historyMutations.modify, analyticsManager]
  );

  const upsertUserMeta = useCallback(
    async (data: PNCS<UserMeta> | PDCSI<UserMeta>) => {
      const { id } = await userMetaMutations.upsert(data);
      analyticsManager.trackEvent(
        {
          category: 'user_meta',
          action: 'update',
          object: 'user_meta'
        },
        { userMetaId: id }
      );
    },
    [userMetaMutations.upsert, analyticsManager]
  );

  const updateNotification = useCallback(
    async (id: string, data: PNCS<Notification>) => {
      await notificationMutations.modify(id, data);
      analyticsManager.trackEvent(
        {
          category: 'notification',
          action: 'update',
          object: 'notification'
        },
        { notificationId: id }
      );
    },
    [notificationMutations.modify, analyticsManager]
  );

  const createNotification = useCallback(
    async (notification: NCS<Notification>) => {
      const newNotification = await notificationMutations.insert(notification);
      analyticsManager.trackEvent(
        {
          category: 'notification',
          action: 'create',
          object: 'notification'
        },
        { notificationId: newNotification.id }
      );

      return newNotification;
    },
    [notificationMutations.insert, analyticsManager]
  );

  const setNotificationRead = useCallback(
    async (id: string, isRead = true) => {
      await updateNotification(id, { readAt: isRead ? new Date().toISOString() : undefined });
      analyticsManager.trackEvent(
        {
          category: 'notification',
          action: 'read',
          object: 'notification'
        },
        { notificationId: id }
      );
    },
    [updateNotification, analyticsManager]
  );

  const setNotificationRemoved = useCallback(
    async (id: string, isRemoved = true) => {
      await updateNotification(id, { removedAt: isRemoved ? new Date().toISOString() : undefined });
      analyticsManager.trackEvent(
        {
          category: 'notification',
          action: 'delete',
          object: 'notification'
        },
        { notificationId: id }
      );
    },
    [updateNotification, analyticsManager]
  );

  const createHistory = useCallback(
    async (business: PartialBusinessWithIds, description?: string, score?: number) => {
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
            description,
            businessId: business.id,
            organizationId: business.organizationId,
            value: { score, data: data[key] }
          });
        });
      };

      if (!business.id) {
        throw new Error('No Business ID Found');
      }

      if (!business.organizationId) {
        throw new Error('No Organization ID Found');
      }

      await createBusinessChange<BusinessChangeFLKeys>(['name'], business);

      await createBusinessChange<BusinessChangeSLCoreKeys>(
        ['vision', 'mission', 'problem', 'tagline', 'industry', 'description'],
        business.data?.core
      );

      await createBusinessChange<BusinessChangeSLImagesKeys>(
        ['logo', 'cover', 'favicon'],
        business.data?.images
      );
    },
    [historyMutations.insert]
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      await notificationMutations.remove(id);
      analyticsManager.trackEvent(
        {
          category: 'notification',
          action: 'delete',
          object: 'notification'
        },
        { notificationId: id }
      );
    },
    [notificationMutations.remove, analyticsManager]
  );

  return {
    createHistory,
    updateHistory,
    upsertUserMeta,
    createNotification,
    updateNotification,
    deleteNotification,
    setNotificationRead,
    setNotificationRemoved
  };
}

export function DeleteBusiness({
  business,
  fn
}: { business: DCS<Business>; fn?: GenericFunction }) {
  const { deleteBusiness } = useDBDataMutation();

  return (
    <Modal
      showActions={true}
      title="Confirm Deletion"
      triggerButtonVariant="destructive"
      triggerButtonContent="Delete Business"
      confirmButtonContent="Delete"
      confirmButtonVariant="destructive"
      confirmButtonOnClick={async () => {
        await deleteBusiness(business);
        fn?.();
      }}
    >
      <span className="block text-muted-foreground">
        Are you sure you want to delete {business.name}? This action cannot be undone.
      </span>
    </Modal>
  );
}

export function DeleteOrganization({
  organization,
  fn
}: {
  organization: DCS<Organization>;
  fn?: GenericFunction;
}) {
  const { deleteOrganization } = useDBDataMutation();

  return (
    <Modal
      showActions={true}
      title={`Delete ${organization.name}`}
      triggerButtonVariant="destructive"
      triggerButtonContent="Delete Organization"
      confirmButtonVariant="destructive"
      confirmButtonContent="Delete"
      confirmButtonOnClick={async () => {
        await deleteOrganization(organization);
        fn?.();
      }}
    >
      <span className="block text-muted-foreground">
        Are you sure you want to delete {organization.name}? This action cannot be undone.
      </span>
    </Modal>
  );
}

export function ShareBusiness({
  business,
  icon,
  fn
}: { business: DCS<Business>; fn?: GenericFunction; icon?: boolean }) {
  const { shareBusiness } = useDBDataMutation();

  return (
    <Modal
      showActions={true}
      title={`Share ${business.name}`}
      triggerButtonVariant={icon ? 'ghost' : 'pulse'}
      triggerButtonContent={
        icon ? (
          <Share className="size-7 cursor-pointer text-gray-400 hover:text-gray-500" />
        ) : (
          'Share Business'
        )
      }
      confirmButtonContent="Share"
      confirmButtonOnClick={async () => {
        await shareBusiness(business);
        fn?.();
      }}
    >
      <span className="block space-y-2 text-muted-foreground">
        <span className="block">Are you sure you want to share with others?</span>
        <span className="block text-xs italic">** note: sharing creates a public url **</span>
      </span>
    </Modal>
  );
}

export function TransferBusiness({ business }: { business: DCS<Business> }) {
  type FormType = z.infer<typeof FormSchema>;

  const FormSchema = z.object({
    organizationId: z.string().min(3).max(255)
  });

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  });

  const { transferBusiness } = useDBDataMutation();
  const { organizations, currentOrganization } = useDBData();

  const router = useRouter();
  const onSubmit = useCallback(
    async ({ organizationId }: FormType) => {
      await transferBusiness(business.id, organizationId, () => {
        router.push(
          createPath({
            page: 'settings',
            base: 'businesses',
            orgId: organizationId,
            businessId: business.id
          })
        );
      });
    },
    [business, transferBusiness, router]
  );

  return (
    <Form {...form}>
      <Modal
        showActions={true}
        title="Transfer Business"
        triggerButtonVariant="outline"
        triggerButtonContent="Transfer Business"
        confirmButtonContent="Transfer"
        confirmButtonOnClick={async () => onSubmit(form.getValues())}
        confirmButtonDisabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        <span className="block text-muted-foreground">Transfer business to another workspace.</span>

        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select workspace" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {organizations
                    .filter((organization) => organization.id !== currentOrganization?.id)
                    .map((organization) => (
                      <SelectItem key={organization.id} value={organization.id}>
                        {organization.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <form onSubmit={form.handleSubmit(onSubmit)} className="hidden">
          <Button
            type="submit"
            variant="pulse"
            className="w-full"
            onClick={async () => onSubmit(form.getValues())}
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Transfer
          </Button>
        </form>
      </Modal>
    </Form>
  );
}
