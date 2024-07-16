'use client';

import { useRxCollection } from 'rxdb-hooks';

import { Button } from '@/components/ui/atoms/button';
import { useHistory, useNotification, useOrganization } from '@/data/migration/data-hooks';
import {
  historyMigration,
  notificationMigration,
  businessMigration,
  organizationMigration,
  organizationBusinessMigration
} from '@/data/migration/migrators';
import { useRxDB } from '@/lib/db/rxdb/hooks';
import { useAuth } from '@/lib/hooks/use-auth';

import type {
  BusinessSchema,
  HistorySchema,
  NotificationSchema,
  OrganizationSchema,
  OrganizationBusinessSchema
} from '@/data/migration/types';

export function DataMigration() {
  const { reinitializeDb } = useRxDB();
  const migrateExtras = useExtrasMigration();
  const migrateOrganization = useOrganizationMigration();

  const migrate = () => {
    migrateOrganization();
    migrateExtras();
  };

  return (
    <div className="flex grow flex-col space-y-4">
      <Button onClick={migrate} className="w-48 bg-pulse">
        Migrate Old Data
      </Button>

      <Button onClick={reinitializeDb} className="w-48 bg-pulse">
        Reinitialize DB
      </Button>
    </div>
  );
}

function useOrganizationMigration() {
  const { user } = useAuth();
  const { organizations = [] } = useOrganization();

  const businessCollection = useRxCollection<BusinessSchema>('business');
  const organizationCollection = useRxCollection<OrganizationSchema>('organization');
  const organizationBusinessCollection =
    useRxCollection<OrganizationBusinessSchema>('organization_business');

  const migrateOrganization = () => {
    organizationMigration(organizationCollection, organizations, user);
    organizations.forEach((organization) => {
      const businesses = organization.businesses ?? [];
      businessMigration(businessCollection, businesses, user, organization.id);
      organizationBusinessMigration(organizationBusinessCollection, organization, businesses);
    });
  };

  return migrateOrganization;
}

function useExtrasMigration() {
  const { user } = useAuth();
  const { histories = [] } = useHistory();
  const { notifications = [] } = useNotification();
  const { getBusinessOrgId } = useOrganization();

  const historyCollection = useRxCollection<HistorySchema>('history');
  const notificationCollection = useRxCollection<NotificationSchema>('notification');

  const migrateExtras = () => {
    notificationMigration(notificationCollection, notifications, user);
    historyMigration(historyCollection, histories, user, getBusinessOrgId);
  };

  return migrateExtras;
}
