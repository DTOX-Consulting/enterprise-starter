'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';

import { buttonVariants } from '@/components/ui/atoms/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/atoms/card';
import { Input } from '@/components/ui/atoms/input';
import { Label } from '@/components/ui/atoms/label';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { cn } from '@/lib/utils';
import { userNameSchema } from '@/lib/validations/user';

import type { User } from '@prisma/client';
import type * as z from 'zod';

interface UserNameFormProps extends HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'name'>;
}

type FormData = z.infer<typeof userNameSchema>;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name ?? ''
    }
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name
      })
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your name was not updated. Please try again.',
        variant: 'destructive'
      });
    }

    toast({
      description: 'Your name has been updated.'
    });

    router.refresh();
  }

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input id="name" className="w-[400px]" size={32} {...register('name')} />
            {errors?.name && <p className="px-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <button type="submit" className={cn(buttonVariants(), className)} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
