'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type PropsWithChildren } from 'react';
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
import { routes } from '@/config/navigation';
import { danglingPromise } from '@/lib/utils/promise';

import { nanoid } from '@/lib/utils/id';

let organizations = [] as { id: string; name: string; businesses: [] }[];
let currentOrganization = null as { id: string; name: string } | null;

const useOrganization = () => {
  return {
    organizations,
    currentOrganization,
    createOrganization: async (organization: { name: string; businesses: [] }) => {
      organizations.push({ id: nanoid(), ...organization });
      Promise.resolve();
    },
    deleteOrganization: (organization: { id: string }) => {
      return () => {
        organizations = organizations.filter((o) => o.id !== organization.id);
      };
    },
    setCurrentOrganizationByName: (name: string) => {
      currentOrganization = organizations.find((o) => o.name === name) ?? null;
    }
  };
};

export function WorkspaceSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    organizations,
    currentOrganization,
    createOrganization,
    deleteOrganization,
    setCurrentOrganizationByName
  } = useOrganization();

  return (
    <WorkspaceSwitcherWrapper>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-full pl-6 pr-0 text-base hover:bg-inherit">
            {currentOrganization ? currentOrganization.name : 'Default'}
            <ChevronDownIcon className="ml-auto size-6 pt-1 text-gray-700 dark:text-gray-200" />
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
                {organizations.map((organization) => (
                  <CommandItem
                    className="h-10 cursor-pointer"
                    key={organization.id}
                    value={organization.name}
                    onSelect={(value) => {
                      setOpen(false);
                      router.push(routes.home);
                      setCurrentOrganizationByName(value);
                    }}
                  >
                    <span>{organization.name}</span>
                    {organizations[0]?.id !== organization.id &&
                      currentOrganization?.id !== organization.id && (
                        <Trash2
                          className="absolute right-2 top-3 size-4 text-red-800 hover:text-red-500"
                          onClick={deleteOrganization(organization)}
                        />
                      )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <WorkspaceSwitcherModal
            onSubmit={(value) => {
              setOpen(false);
              router.push(routes.home);
              danglingPromise(createOrganization({ name: value, businesses: [] }));
            }}
          />
        </PopoverContent>
      </Popover>
    </WorkspaceSwitcherWrapper>
  );
}

function WorkspaceSwitcherWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex h-10 flex-row items-center rounded-lg px-3 text-gray-700 dark:text-gray-200">
      <span className="text-md flex items-center justify-center text-gray-400 dark:text-gray-200">
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <title>Organization</title>
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </span>
      {children}
    </div>
  );
}

function WorkspaceSwitcherModal({ onSubmit }: { onSubmit: (value: string) => void }) {
  type FormType = z.infer<typeof FormSchema>;

  const FormSchema = z.object({
    organizationName: z.string().min(3).max(255)
  });

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  });

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="mx-1 mt-4">
            <Button variant="outline" size="sm" className="w-full">
              + Create New
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Workspace</DialogTitle>
            <DialogDescription>Create a new workspace to manage your businesses.</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Enter workspace name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data.organizationName))}>
              <Button
                type="submit"
                className="w-full bg-pulse disabled:bg-gray-500"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
              >
                Create
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
