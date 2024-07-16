'use client';

import type {
  BusinessCollection,
  HistoryCollection,
  NotificationCollection,
  OrganizationCollection,
  OrganizationBusinessCollection,
  PreviousDataBusiness,
  PreviousDataHistory,
  PreviousDataNotification,
  PreviousDataOrganization
} from '@/data/migration/types';

export const organizationMigration = (
  collection?: OrganizationCollection | null,
  organizations: PreviousDataOrganization[] = [],
  user: { id: string } = { id: 'default' }
) => {
  if (!collection) {
    return;
  }

  organizations.forEach((organization) => {
    void collection.upsert({
      ownerId: user.id,
      id: organization.id,
      name: organization.name,
      createdAt: organization.createdAt,
      updatedAt: organization.lastUpdated,
      type: organization.type ?? 'personal'
    });
  });
};

export const businessMigration = (
  collection?: BusinessCollection | null,
  businesses: PreviousDataBusiness[] = [],
  user: { id: string } = { id: 'default' },
  orgId = ''
) => {
  if (!collection) {
    return;
  }

  businesses.forEach((business) => {
    void collection.upsert({
      id: business.id,
      ownerId: user.id,
      organizationId: orgId,
      name: business.name,
      data: business.data,
      meta: business.meta,
      image: business.image,
      createdAt: business.createdAt,
      updatedAt: business.lastUpdated,
      description: business.description
    });
  });
};

export const organizationBusinessMigration = (
  collection?: OrganizationBusinessCollection | null,
  organization: PreviousDataOrganization | null = null,
  businesses: PreviousDataBusiness[] = []
) => {
  if (!collection || !organization) {
    return;
  }

  businesses.forEach((business) => {
    void collection.upsert({
      id: `${organization.id}-${business.id}`,
      businessId: business.id,
      organizationId: organization.id,
      createdAt: business.createdAt,
      updatedAt: business.lastUpdated
    });
  });
};

export const notificationMigration = (
  collection?: NotificationCollection | null,
  notifications: PreviousDataNotification[] = [],
  user: { id: string } = { id: 'default' }
) => {
  if (!collection) {
    return;
  }

  notifications.forEach((notification) => {
    void collection.upsert({
      id: notification.id,
      ownerId: user.id,
      icon: notification.icon,
      meta: notification.meta,
      content: notification.content,
      createdAt: notification.createdAt,
      updatedAt: notification.lastUpdated
    });
  });
};

export const historyMigration = (
  collection?: HistoryCollection | null,
  histories: PreviousDataHistory[] = [],
  user: { id: string } = { id: 'default' },
  getBusinessOrgId: (businessId: string) => string | undefined = () => ''
) => {
  if (!collection) {
    return;
  }

  histories.forEach((history) => {
    const orgId = getBusinessOrgId(history.businessId);
    if (!orgId) {
      return;
    }

    void collection.upsert({
      id: history.id,
      ownerId: user.id,
      key: history.key,
      organizationId: orgId,
      createdAt: history.createdAt,
      updatedAt: history.lastUpdated,
      businessId: history.businessId,
      value: { data: history.value }
    });
  });
};
