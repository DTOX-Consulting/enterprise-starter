'use client';

import {
  Root as ContextMenuRoot,
  Trigger as ContextMenuTrigger,
  Group as ContextMenuGroup,
  Portal as ContextMenuPortal,
  Sub as ContextMenuSub,
  RadioGroup as ContextMenuRadioGroup,
  SubTrigger as RadixContextMenuSubTrigger,
  SubContent as RadixContextMenuSubContent,
  Content as RadixContextMenuContent,
  Item as RadixContextMenuItem,
  CheckboxItem as RadixContextMenuCheckboxItem,
  RadioItem as RadixContextMenuRadioItem,
  Label as RadixContextMenuLabel,
  Separator as RadixContextMenuSeparator,
  ItemIndicator
} from '@radix-ui/react-context-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { forwardRef, ElementRef, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const ContextMenuSubTrigger = forwardRef<
  ElementRef<typeof RadixContextMenuSubTrigger>,
  ComponentPropsWithoutRef<typeof RadixContextMenuSubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset = false, children, ...props }, ref) => (
  <RadixContextMenuSubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset ? 'pl-8' : '',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </RadixContextMenuSubTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

const ContextMenuSubContent = forwardRef<
  ElementRef<typeof RadixContextMenuSubContent>,
  ComponentPropsWithoutRef<typeof RadixContextMenuSubContent>
>(({ className, ...props }, ref) => (
  <RadixContextMenuSubContent
    ref={ref}
    className={cn(
      'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1',
      className
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

const ContextMenuContent = forwardRef<
  ElementRef<typeof RadixContextMenuContent>,
  ComponentPropsWithoutRef<typeof RadixContextMenuContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPortal>
    <RadixContextMenuContent
      ref={ref}
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
      {...props}
    />
  </ContextMenuPortal>
));
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = forwardRef<
  ElementRef<typeof RadixContextMenuItem>,
  ComponentPropsWithoutRef<typeof RadixContextMenuItem> & {
    inset?: boolean;
  }
>(({ className, inset = false, ...props }, ref) => (
  <RadixContextMenuItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset ? 'pl-8' : '',
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof RadixContextMenuCheckboxItem>,
  ComponentPropsWithoutRef<typeof RadixContextMenuCheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <RadixContextMenuCheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="size-4" />
      </ItemIndicator>
    </span>
    {children}
  </RadixContextMenuCheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof RadixContextMenuRadioItem>,
  ComponentPropsWithoutRef<typeof RadixContextMenuRadioItem>
>(({ className, children, ...props }, ref) => (
  <RadixContextMenuRadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <Circle className="size-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadixContextMenuRadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

const ContextMenuLabel = forwardRef<
  ElementRef<typeof RadixContextMenuLabel>,
  ComponentPropsWithoutRef<typeof RadixContextMenuLabel> & {
    inset?: boolean;
  }
>(({ className, inset = false, ...props }, ref) => (
  <RadixContextMenuLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', inset ? 'pl-8' : '', className)}
    {...props}
  />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';

const ContextMenuSeparator = forwardRef<
  ElementRef<typeof RadixContextMenuSeparator>,
  ComponentPropsWithoutRef<typeof RadixContextMenuSeparator>
>(({ className, ...props }, ref) => (
  <RadixContextMenuSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const ContextMenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
    {...props}
  />
);
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup
};
