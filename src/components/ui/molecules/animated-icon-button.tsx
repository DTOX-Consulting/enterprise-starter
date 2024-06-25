import { Sparkles, type LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/atoms/button';
import { cn } from '@/lib/utils';

import type { UseFormReturn } from '@/components/ui/atoms/form';
import type { PropsWithChildren } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: any is used to get the type of the field values
export function AnimatedButton<T extends UseFormReturn<any>>({
  form,
  label,
  children,
  className,
  Icon = Sparkles
}: PropsWithChildren<{ form: T; label: string; className?: string; Icon?: LucideIcon }>) {
  return (
    <Button
      type="submit"
      className={cn('bg-pulse disabled:bg-gray-500', className)}
      disabled={form.formState.isSubmitting || !form.formState.isValid}
    >
      <Icon className={cn('size-5', form.formState.isSubmitting ? 'animate-spin' : '')} />
      <span className="mx-2 inline-flex">{label}</span>
      {children}
    </Button>
  );
}
