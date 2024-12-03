import { Border } from '@/components/animations/border';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';

import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export function StatList({
  children,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof FadeInStagger>, 'children'> & {
  children: ReactNode;
}) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  );
}

export function StatListItem({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <Border as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-base text-gray-5 dark:text-gray-4">{label}</dt>
      <dd className="font-display text-3xl font-semibold text-gray-10 dark:text-gray-2 sm:text-4xl">
        {value}
      </dd>
    </Border>
  );
}
