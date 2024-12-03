'use client';

import {
  Root as Select,
  Group as SelectGroup,
  Value as SelectValue,
  Trigger as SelectPrimitiveTrigger,
  Content as SelectPrimitiveContent,
  Portal,
  Viewport,
  Label as SelectPrimitiveLabel,
  Item as SelectPrimitiveItem,
  Separator as SelectPrimitiveSeparator,
  ItemIndicator,
  ItemText,
  Icon as SelectPrimitiveIcon
} from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

import type { Option } from '@/data/option';

const SelectTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof SelectPrimitiveTrigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitiveTrigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitiveIcon asChild>
      <ChevronDown className="size-4 opacity-50" />
    </SelectPrimitiveIcon>
  </SelectPrimitiveTrigger>
));
SelectTrigger.displayName = SelectPrimitiveTrigger.displayName;

const SelectContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitiveContent>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <Portal>
    <SelectPrimitiveContent
      ref={ref}
      className={cn(
        'relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        position === 'popper' && 'translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </Viewport>
    </SelectPrimitiveContent>
  </Portal>
));
SelectContent.displayName = SelectPrimitiveContent.displayName;

const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitiveLabel>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveLabel
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitiveLabel.displayName;

const SelectItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof SelectPrimitiveItem>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitiveItem
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <ItemIndicator>
          <Check className="size-4" />
        </ItemIndicator>
      </span>

      <ItemText>{children}</ItemText>
    </SelectPrimitiveItem>
  )
);
SelectItem.displayName = SelectPrimitiveItem.displayName;

const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitiveSeparator>
>(({ className, ...props }, ref) => (
  <SelectPrimitiveSeparator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitiveSeparator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator
};

export const SelectSingle = ({
  value,
  options,
  onChange,
  placeholder,
  defaultValue
}: {
  value?: string;
  options?: Option[];
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}) => (
  <Select value={value} defaultValue={defaultValue} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue className="text-sm" placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options?.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
