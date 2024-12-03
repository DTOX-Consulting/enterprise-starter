'use client';

import { Root as ProgressRoot, Indicator as ProgressIndicator } from '@radix-ui/react-progress';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

const Progress = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof ProgressRoot> & { className?: string }
>(({ className, value, ...props }, ref) => (
  <ProgressRoot
    ref={ref}
    className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
    {...props}
  >
    <ProgressIndicator
      className="size-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressRoot>
));
Progress.displayName = ProgressRoot.displayName;

export { Progress };
