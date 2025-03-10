'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { type Control, useFieldArray, useForm } from 'react-hook-form';
import { stringify } from 'safe-stable-stringify';
import { z } from 'zod';

import { Button } from '@/components/ui/atoms/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/atoms/form';
import { Input } from '@/components/ui/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/atoms/select';
import { Textarea } from '@/components/ui/atoms/textarea';
import { toast } from '@/components/ui/organisms/toast/use-toast';
import { cn } from '@/lib/utils';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.'
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.'
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.'
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' })
      })
    )
    .optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [{ value: 'https://shadcn.com' }, { value: 'https://twitter.com/shadcn' }]
};

const UsernameField = ({ control }: { control: Control<ProfileFormValues> }) => (
  <FormField
    control={control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter your username" {...field} />
        </FormControl>
        <FormDescription>
          This is your public display name. It can be your real name or a pseudonym. You can only
          change this once every 30 days.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

const EmailField = ({ control }: { control: Control<ProfileFormValues> }) => (
  <FormField
    control={control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="m@example.com">m@example.com</SelectItem>
            <SelectItem value="m@google.com">m@google.com</SelectItem>
            <SelectItem value="m@support.com">m@support.com</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          You can manage verified email addresses in your{' '}
          <Link href="/examples/forms">email settings</Link>.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

const BioField = ({ control }: { control: Control<ProfileFormValues> }) => (
  <FormField
    control={control}
    name="bio"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Tell us a little bit about yourself"
            className="resize-none"
            {...field}
          />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

const URLsField = ({
  fields,
  control,
  append
}: {
  fields: { id: string; value: string }[];
  control: Control<ProfileFormValues>;
  append: (value: { value: string }) => void;
}) => (
  <div>
    {fields.map((field, index) => (
      <FormField
        control={control}
        key={field.id}
        name={`urls.${index}.value`}
        render={({ field: fieldParam }) => (
          <FormItem>
            <FormLabel className={cn(index !== 0 && 'sr-only')}>URLs</FormLabel>
            <FormDescription className={cn(index !== 0 && 'sr-only')}>
              Add links to your website, blog, or social media profiles.
            </FormDescription>
            <FormControl>
              <Input {...fieldParam} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ))}
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={() => append({ value: '' })}
    >
      Add URL
    </Button>
  </div>
);

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control
  });

  const onSubmit = (data: ProfileFormValues) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-10 p-4">
          <code className="text-white">{stringify(data, null, 2)}</code>
        </pre>
      )
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={() => form.handleSubmit(onSubmit)} className="space-y-8">
        <UsernameField control={form.control} />
        <EmailField control={form.control} />
        <BioField control={form.control} />
        <URLsField fields={fields} control={form.control} append={append} />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
