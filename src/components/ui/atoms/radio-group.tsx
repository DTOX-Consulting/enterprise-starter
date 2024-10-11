'use client';

import {
  Root as RadioGroupRoot,
  Item as RadioGroupItem,
  Indicator as RadioGroupIndicator
} from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupRoot>,
  React.ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => (
  <RadioGroupRoot className={cn('grid gap-2', className)} {...props} ref={ref} />
));
RadioGroup.displayName = RadioGroupRoot.displayName;

const RadioGroupItemComponent = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItem>
>(({ className, ...props }, ref) => (
  <RadioGroupItem
    ref={ref}
    className={cn(
      'size-4 rounded-full border border-input ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <RadioGroupIndicator className="flex items-center justify-center">
      <Circle className="size-2.5 fill-primary text-primary" />
    </RadioGroupIndicator>
  </RadioGroupItem>
));
RadioGroupItemComponent.displayName = RadioGroupItem.displayName;

export { RadioGroup, RadioGroupItemComponent as RadioGroupItem };
