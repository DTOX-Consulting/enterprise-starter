import type { ComponentPropsWithoutRef } from 'react';

export function Checkbox({
  label,
  ...props
}: ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="checkbox"
        {...props}
        className="size-6 flex-none appearance-none rounded-md border border-gray-10/20 outline-none checked:border-[0.5rem] checked:border-gray-10 focus-visible:ring-1 focus-visible:ring-gray-10 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-gray-11">{label}</span>
    </label>
  );
}
