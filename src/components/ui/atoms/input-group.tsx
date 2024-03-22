import { useId, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export function Input({
  label,
  type = 'text',
  className = '',
  ...props
}: ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId();

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        id={id}
        type={type}
        {...props}
        placeholder=" "
        className={cn(
          'peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl dark:text-neutral-50 dark:focus:border-neutral-50',
          className
        )}
      />
      <label
        htmlFor={id}
        className="pointer-events-none  absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-gray-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950 dark:text-neutral-50 dark:peer-focus:text-neutral-50 dark:peer-[:not(:placeholder-shown)]:text-neutral-50"
      >
        {label}
      </label>
    </div>
  );
}
