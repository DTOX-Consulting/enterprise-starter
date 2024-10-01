
import { Root as RadioGroupRoot, Item as RadioGroupItem, Indicator as RadioGroupIndicator } from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const RadioGroupButton = React.forwardRef<
  React.ElementRef<typeof RadioGroupRoot>,
  React.ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => (
  <RadioGroupRoot
    className={cn('grid gap-0 overflow-hidden rounded-md border border-primary', className)}
    {...props}
    ref={ref}
  />
));
RadioGroupButton.displayName = RadioGroupRoot.displayName;

const RadioGroupButtonItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItem>
>(({ className, children, ...props }, ref) => (
  <RadioGroupItem
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center border-primary bg-white p-2 text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&:not(:first-child)]:border-l',
      className
    )}
    {...props}
  >
    <RadioGroupIndicator className="flex items-center justify-center">
      <Check className="mr-1 size-2.5 fill-current text-current" />
    </RadioGroupIndicator>
    {children}
  </RadioGroupItem>
));
RadioGroupButtonItem.displayName = RadioGroupItem.displayName;

export { RadioGroupButton, RadioGroupButtonItem };
