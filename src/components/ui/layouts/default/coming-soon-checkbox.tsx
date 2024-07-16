'use client';

import { Checkbox } from '@/components/ui/atoms/checkbox';
import { useAuth } from '@/lib/hooks/use-auth';
import { api } from '@/trpc/react';

export function ComingSoonCheckbox() {
  const { subscription, user } = useAuth();
  const { mutate } = api.crm.upsertContact.useMutation();

  const enabled = !!user?.email;

  const userData = {
    notifyMe: false,
    email: user?.email ?? '',
    lastname: user?.lastName ?? '',
    firstname: user?.firstName ?? '',
    subscriptionPlan: subscription?.key ?? ''
  };

  const { data } = api.crm.getOrUpsertContact.useQuery(userData, { enabled });

  if (!data) {
    return null;
  }

  return (
    <Checkbox
      checked={data.notifyMe}
      onCheckedChange={(isChecked) => {
        data.notifyMe = isChecked === 'indeterminate' ? false : isChecked;

        mutate({
          ...userData,
          notifyMe: data.notifyMe
        });
      }}
    />
  );
}
