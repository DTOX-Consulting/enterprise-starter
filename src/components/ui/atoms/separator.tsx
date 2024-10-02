'use client';

import { Root } from '@radix-ui/react-separator';
// eslint-disable-next-line import-x/no-namespace
import * as React from 'react';

import { cn } from '@/lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className
    )}
    {...props}
  />
));
Separator.displayName = Root.displayName;

export { Separator };
