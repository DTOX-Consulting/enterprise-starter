'use client';

import { G } from '@mobily/ts-belt';
import { useRouter } from 'next/navigation';

import { Switcher } from '@/components/ui/molecules/switcher';
import { createPath } from '@/config/navigation';
import { useNavigation } from '@/config/navigation/use-navigation';
import { useAbilities } from '@/config/permissions/use-abilities';

import type { LucideIcon } from 'lucide-react';

export function EntitySwitcher({
  icon
}: Readonly<{
  icon?: LucideIcon;
}>) {
  const router = useRouter();
  const { abilities } = useAbilities();
  const { path, inPages } = useNavigation();

  const canCreate = abilities.can('create', 'Workspace');

  const choices = [] as { id: string; name: string }[];
  const selected = G.isNotNullable(path.page) ? { id: path.page, name: path.page } : undefined;

  const newAction = () => router.push(createPath({ base: 'dashboard', page: 'new' }));

  const onSelect = () => {
    const newPath = createPath({
      page: path.page,
      base: 'dashboard'
    });

    if (inPages(newPath)) {
      router.push(newPath);
      return;
    }

    router.push(
      createPath({
        base: 'dashboard'
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
      choices={choices}
      namePlaceholder="Select a workspace"
    />
  );
}

export function SwitcherNavigation() {
  return (
    <div className="flex max-w-72 grow-0 items-center whitespace-nowrap sm:max-w-none">
      <EntitySwitcher />
    </div>
  );
}
