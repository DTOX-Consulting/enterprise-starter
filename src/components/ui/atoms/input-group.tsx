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
          'peer block w-full border border-gray-3 bg-transparent px-6 pb-4 pt-12 text-base/6 text-gray-11 ring-4 ring-transparent transition focus:border-gray-10 focus:outline-none focus:ring-gray-10/5 group-first:rounded-t-2xl group-last:rounded-b-2xl dark:text-gray-11 dark:focus:border-gray-50',
          className
        )}
      />
      <label
        htmlFor={id}
        className="pointer-events-none  absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-gray-11 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-gray-11 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-gray-11 dark:text-gray-11 dark:peer-focus:text-gray-11 dark:peer-[:not(:placeholder-shown)]:text-gray-11"
      >
        {label}
      </label>
    </div>
  );
}
