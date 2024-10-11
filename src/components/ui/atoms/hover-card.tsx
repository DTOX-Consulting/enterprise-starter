'use client';

import {
  Content as HoverCardContentPrimitive,
  Root as HoverCardRoot,
  Trigger as HoverCardTriggerPrimitive
} from '@radix-ui/react-hover-card';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const HoverCard = HoverCardRoot;

const HoverCardTrigger = HoverCardTriggerPrimitive;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof HoverCardContentPrimitive>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardContentPrimitive
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in zoom-in-90',
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardContentPrimitive.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
