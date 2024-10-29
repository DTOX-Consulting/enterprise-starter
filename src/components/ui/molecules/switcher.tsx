'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightCircle, ChevronsUpDown, type LucideIcon } from 'lucide-react';
import { type PropsWithChildren, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { z } from 'zod';

import { Button } from '@/components/ui/atoms/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/atoms/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/atoms/dialog';
import {
  Form,
  useForm,
  FormItem,
  FormField,
  FormControl,
  FormMessage
} from '@/components/ui/atoms/form';
import { Input } from '@/components/ui/atoms/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/atoms/popover';
import { Upgrade } from '@/config/permissions/upgrade';
import { cn } from '@/lib/utils';

type BasicChoice = { id: string; name: string };

type SwitcherProps<T extends BasicChoice> = {
  choices?: T[];
  selected?: T;
  icon?: LucideIcon;
  toCreate?: string;
  disabled?: boolean;
  canCreate?: boolean;
  namePlaceholder?: string;
  onSelect?: (choice: T) => void;
  onSubmit?: (value: string) => void;
  newAction?: 'modal' | (() => void);
};

export function Switcher<T extends BasicChoice>({
  icon,
  choices,
  selected,
  onSubmit,
  onSelect,
  canCreate,
  toCreate,
  disabled,
  newAction,
  namePlaceholder
}: Readonly<SwitcherProps<T>>) {
  const [open, setOpen] = useState(false);

  if (isMobile) {
    namePlaceholder = '---';
  }

  return (
    <SwitcherWrapper icon={icon}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex w-full items-center text-sm hover:bg-inherit"
            disabled={disabled}
          >
            <span>{selected?.name ?? namePlaceholder ?? '---'}</span>
            <ChevronsUpDown className="ml-1 size-4 text-gray-700 dark:text-gray-200" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="-ml-3 mt-4 w-full">
          <Command>
            <CommandInput
              placeholder="Search..."
              className="w-56 border-none hover:outline-none focus:outline-none focus:ring-0"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {choices?.map((choice) => (
                  <CommandItem
                    aria-selected={false}
                    className={cn('h-10 cursor-pointer bg-transparent', {
                      'bg-accent text-accent-foreground': choice.id === selected?.id
                    })}
                    key={choice.id}
                    value={ChevronRightCircle.name}
                    onSelect={() => {
                      setOpen(false);
                      onSelect?.(choice);
                    }}
                  >
                    <span>{choice.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {typeof newAction === 'function' && (
            <SwitcherNewButton canCreate={canCreate} onClick={newAction} setOpen={setOpen} />
          )}
          {newAction === 'modal' && (
            <SwitcherModal
              setOpen={setOpen}
              toCreate={toCreate}
              onSubmit={onSubmit}
              canCreate={canCreate}
            />
          )}
        </PopoverContent>
      </Popover>
    </SwitcherWrapper>
  );
}

function SwitcherNewButton({
  onClick,
  setOpen,
  canCreate
}: Readonly<{
  canCreate?: boolean;
  onClick: () => void;
  setOpen: (value: boolean) => void;
}>) {
  return (
    <Upgrade hasAccess={canCreate ?? false}>
      <Button
        size="sm"
        variant="outline"
        className="w-full"
        onClick={() => {
          setOpen(false);
          onClick();
        }}
      >
        + Create New
      </Button>
    </Upgrade>
  );
}

function SwitcherWrapper({ children, icon }: PropsWithChildren<{ icon?: LucideIcon }>) {
  const Icon = icon;
  return (
    <div className="flex h-10 flex-row items-center truncate rounded-lg px-3 text-gray-700 dark:text-gray-200">
      <span className="text-md flex items-center justify-center text-gray-400 dark:text-gray-200">
        {Icon ? <Icon className="size-6" /> : null}
      </span>
      {children}
    </div>
  );
}

function SwitcherModal({
  setOpen,
  onSubmit,
  toCreate,
  canCreate
}: Readonly<{
  toCreate?: string;
  canCreate?: boolean;
  setOpen: (value: boolean) => void;
  onSubmit?: (value: string) => void;
}>) {
  type FormType = z.infer<typeof FormSchema>;

  const FormSchema = z.object({
    name: z.string().min(3).max(255)
  });

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  });

  return (
    <Upgrade hasAccess={canCreate ?? false}>
      <Form {...form}>
        <Dialog>
          <DialogTrigger asChild>
            <div className="mx-1 mt-4">
              <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(false)}>
                + Create New
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New</DialogTitle>
              <DialogDescription>Create a new {toCreate ?? 'entity'}</DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} value={field.value || ''} placeholder="Enter name..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void form.handleSubmit((data) => {
                    if (onSubmit) {
                      onSubmit(data.name);
                    }
                  })(event);
                }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || !form.formState.isValid}
                >
                  Create
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
    </Upgrade>
  );
}
