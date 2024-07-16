import { Separator } from '@/components/ui/atoms/separator';

export function SettingsHeader() {
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your details and preferences.</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
}
