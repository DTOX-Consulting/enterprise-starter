'use client';

import {
  Root as PopoverRoot,
  Trigger as PopoverTriggerPrimitive,
  Content as PopoverContentPrimitive,
  Portal as PopoverPortalPrimitive
} from '@radix-ui/react-popover';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const Popover = PopoverRoot;

const PopoverTrigger = PopoverTriggerPrimitive;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof PopoverContentPrimitive>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPortalPrimitive>
    <PopoverContentPrimitive
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPortalPrimitive>
));
PopoverContent.displayName = PopoverContentPrimitive.displayName;

export { Popover, PopoverTrigger, PopoverContent };
