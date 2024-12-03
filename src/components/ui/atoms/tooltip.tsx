'use client';

import { Provider, Root, Trigger, Content } from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type PropsWithChildren
} from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = Provider;

const Tooltip = Root;

const TooltipTrigger = Trigger;

const TooltipContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = Content.displayName;

const Tip = ({
  content,
  children,
  className
}: PropsWithChildren<{ content: string | ReactNode; className?: string }>) => (
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

const InverseTip = ({ children, content }: PropsWithChildren<{ content: string | ReactNode }>) => (
  <Tip content={children}>{content}</Tip>
);

const InfoTip = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <Tip content={children}>
    <Info className={cn('ml-2 size-4 text-gray-4 hover:text-gray-2', className)} />
  </Tip>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Tip, InverseTip, InfoTip };
