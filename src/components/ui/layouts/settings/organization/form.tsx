'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/atoms/button';
import { ContainerAnimated } from '@/components/ui/atoms/container';
import { Form, useForm } from '@/components/ui/atoms/form';
import { Separator } from '@/components/ui/atoms/separator';
import { AnimatedButton } from '@/components/ui/molecules/animated-icon-button';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { createPath } from '@/config/navigation';
import { useNavigation } from '@/config/navigation/use-navigation';
import { useDBData, useDBDataMutation } from '@/data';
import { organizationTypes } from '@/data/constants';
import { NewOrganizationFormSchema, type NewOrganizationFormType } from '@/data/forms';

import { OrganizationField } from '@/app/(authenticated)/businesses/components/organization-field';

export function OrganizationForm() {
  const router = useRouter();
  const { is } = useNavigation();
  const { currentOrganization } = useDBData();
  const { updateOrganization, deleteOrganization } = useDBDataMutation();

  const form = useForm<NewOrganizationFormType>({
    resolver: zodResolver(NewOrganizationFormSchema),
    defaultValues: {
      organizationName: currentOrganization?.name ?? '',
      organizationType: currentOrganization?.type ?? ''
    }
  });

  if (!currentOrganization || !is('orgId', currentOrganization?.id)) {
    return null;
  }

  if (currentOrganization.name && !form.getValues().organizationName) {
    form.setValue('organizationName', currentOrganization.name);
    form.setValue('organizationType', currentOrganization.type);
  }

  async function onSubmit(data: NewOrganizationFormType) {
    if (!currentOrganization) {
      return null;
    }

    await updateOrganization(currentOrganization.id, {
      name: data.organizationName,
      type: data.organizationType
    });

    toast({
      title: 'Organization updated',
      description: 'Your organization has been updated successfully.'
    });
  }

  return (
    <>
      <ContainerAnimated size={'no-padding'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 space-y-12">
            <OrganizationField
              label="Name"
              required={true}
              name="organizationName"
              placeholder="Organization Name"
              description="What's the name of your company or team?"
              form={form}
            />
            <OrganizationField
              required={true}
              label="Type of organization"
              name="organizationType"
              placeholder="Organization Type"
              description="What would best describe your organization?"
              form={form}
              isSelect={true}
              options={organizationTypes}
            />
            <div className="flex w-full flex-row items-end justify-end px-4">
              <Button
                type="button"
                className="mr-4"
                variant="outline"
                onClick={() => form.reset()}
                disabled={!form.formState.isDirty}
              >
                Cancel
              </Button>
              <AnimatedButton label="Save" form={form} />
            </div>
          </form>
        </Form>
      </ContainerAnimated>

      <Separator />
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Danger Zone</h3>
        <p className="pb-6 text-sm text-muted-foreground">
          Delete your organization. This action is irreversible.
        </p>
        <Button
          variant={'destructive'}
          onClick={() => {
            deleteOrganization(currentOrganization, () =>
              router.push(createPath({ base: 'businesses' }))
            );
          }}
        >
          Delete Organization
        </Button>
      </div>
    </>
  );
}
