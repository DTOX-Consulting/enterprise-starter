import { ContainerAnimated } from '@/components/ui/atoms/container';
import { Separator } from '@/components/ui/atoms/separator';
import { OrganizationForm } from '@/components/ui/layouts/settings/organization/form';

export const dynamic = 'force-dynamic';

export default function SettingsOrganizationPage() {
  return (
    <ContainerAnimated className="mt-8 flex grow flex-col">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Organization</h3>
          <p className="text-sm text-muted-foreground">
            Update your organization settings. Set your name and type.
          </p>
        </div>
        <Separator />
        <OrganizationForm />
      </div>
    </ContainerAnimated>
  );
}
