'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const Tip = ({
  content,
  children,
  className
}: React.PropsWithChildren<{ content: string | React.ReactNode; className?: string }>) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className={className} asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className={typeof content === 'string' && !content ? 'hidden' : ''}>
        <span className="inline-block">{content}</span>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const InverseTip = ({
  children,
  content
}: React.PropsWithChildren<{ content: string | React.ReactNode }>) => (
  <Tip content={children}>{content}</Tip>
);

const InfoTip = ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <Tip content={children}>
      <Info className={cn('ml-2 size-4 text-neutral-400 hover:text-neutral-200', className)} />
    </Tip>
  );

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Tip, InverseTip, InfoTip };
