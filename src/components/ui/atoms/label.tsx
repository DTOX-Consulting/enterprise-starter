'use client';

import { Root as LabelRoot } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<typeof LabelRoot> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelRoot ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelRoot.displayName;

export { Label };
