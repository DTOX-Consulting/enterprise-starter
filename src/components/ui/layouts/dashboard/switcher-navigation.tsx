'use client';

import { useRouter } from 'next/navigation';

import { Switcher } from '@/components/ui/molecules/switcher';
import { createPath } from '@/config/navigation';
import { useNavigation } from '@/config/navigation/use-navigation';
import { useAbilities } from '@/config/permissions/use-abilities';
import { useDBData } from '@/data';

import type { LucideIcon } from 'lucide-react';

export function BusinessSwitcher({
  icon
}: {
  icon?: LucideIcon;
}) {
  const router = useRouter();
  const { abilities } = useAbilities();
  const { path, inPages } = useNavigation();
  const { currentBusinesses, currentBusiness, currentOrganization } = useDBData();

  const currentOrgId = currentOrganization?.id;
  const canCreate = abilities.can('create', 'Business');
  const selected = path.businessId ? currentBusiness : undefined;

  const newAction = () =>
    router.push(createPath({ base: 'businesses', orgId: currentOrgId, page: 'new' }));

  const onsSelect = ({ id: businessId }: { id: string }) => {
    const newPath = createPath({
      base: 'businesses',
      orgId: currentOrgId,
      businessId: businessId,
      page: path.page ?? 'core'
    });

    if (inPages(newPath)) {
      router.push(newPath);
      return;
    }

    router.push(
      createPath({
        page: 'core',
        base: 'businesses',
        orgId: currentOrgId,
        businessId: businessId
      })
    );
  };

  return (
    <Switcher
      icon={icon}
      selected={selected}
      onSelect={onsSelect}
      canCreate={canCreate}
      newAction={newAction}
      disabled={!currentOrgId}
      choices={currentBusinesses}
      namePlaceholder="Select a business"
    />
  );
}

export function OrganizationSwitcher({
  icon
}: {
  icon?: LucideIcon;
}) {
  const router = useRouter();
  const { abilities } = useAbilities();
  const { path, inPages } = useNavigation();
  const { organizations, currentOrganization } = useDBData();

  const canCreate = abilities.can('create', 'Organization');
  const selected = path.orgId ? currentOrganization : undefined;

  const newAction = () => router.push(createPath({ base: 'businesses', page: 'new' }));

  const onSelect = ({ id: organizationId }: { id: string }) => {
    const newPath = createPath({
      page: path.page,
      base: 'businesses',
      orgId: organizationId
    });

    if (inPages(newPath)) {
      router.push(newPath);
      return;
    }

    router.push(
      createPath({
        base: 'businesses',
        orgId: organizationId
      })
    );
  };

  return (
    <Switcher
      icon={icon}
      selected={selected}
      onSelect={onSelect}
      canCreate={canCreate}
      newAction={newAction}
      choices={organizations}
      namePlaceholder="Select a workspace"
    />
  );
}

export function SwitcherNavigation() {
  return (
    <div className="flex max-w-72 grow-0 items-center whitespace-nowrap sm:max-w-none">
      <OrganizationSwitcher />
      <span>/</span>
      <BusinessSwitcher />
    </div>
  );
}
