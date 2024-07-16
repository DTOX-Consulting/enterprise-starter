'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FolderSync } from 'lucide-react';
import { useCallback } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/atoms/button';
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from '@/components/ui/atoms/dialog';
import {
  Form,
  useForm,
  FormItem,
  FormField,
  FormControl,
  FormMessage
} from '@/components/ui/atoms/form';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent
} from '@/components/ui/atoms/select';
import { useDBDataMutation, useDBData } from '@/data';

import type { Business } from '@/lib/db/rxdb/schemas/business';
import type { DCS } from '@/lib/db/rxdb/utils/schema';

export function TransferBusinessModal({ business }: { business: DCS<Business> }) {
  type FormType = z.infer<typeof FormSchema>;

  const FormSchema = z.object({
    organizationId: z.string().min(3).max(255)
  });

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {}
  });

  const { transferBusiness } = useDBDataMutation();
  const { organizations, currentOrganization } = useDBData();

  const onSubmit = useCallback(
    (formData: FormType) => {
      const organization = organizations?.find((org) => org.id === formData.organizationId);
      organization && transferBusiness(business, organization);
    },
    [business, organizations, transferBusiness]
  );

  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <FolderSync className="size-4" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Business</DialogTitle>
            <DialogDescription>Transfer business to another workspace.</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="organizationId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select workspace" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {organizations
                      .filter((organization) => organization.id !== currentOrganization?.id)
                      .map((organization) => (
                        <SelectItem key={organization.id} value={organization.id}>
                          {organization.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                type="submit"
                onClick={() => onSubmit(form.getValues())}
                className="w-full bg-pulse disabled:bg-gray-500"
                disabled={form.formState.isSubmitting || !form.formState.isValid}
              >
                Transfer
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
