import { G } from '@mobily/ts-belt';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, Trash } from 'lucide-react';
import { useEditor } from 'novel';
import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { PopoverContent } from '@/components/ui/atoms/popover';
import { cn } from '@/lib/utils';

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export function getUrlFromString(str: string): string | null {
  if (isValidUrl(str)) return str;
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString();
    }
    return null;
  } catch {
    return null;
  }
}

type LinkSelectorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { editor } = useEditor();

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus();
  });
  if (!editor) return null;

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-2 rounded-none border-none">
          <p className="text-base">↗</p>
          <p
            className={cn('underline decoration-stone-4 underline-offset-4', {
              'text-blue-5': editor.isActive('link')
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
        <form
          onSubmit={(event) => {
            const target = event.currentTarget as HTMLFormElement;
            event.preventDefault();
            const input = target[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            if (G.isNotNullable(url)) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="flex p-1 "
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            className="flex-1 bg-background p-1 text-sm outline-none"
            defaultValue={(editor.getAttributes('link')['href'] as string) || ''}
          />
          {G.isNotNullable(editor.getAttributes('link')['href']) ? (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-6 transition-all hover:bg-red-100 dark:hover:bg-red-8"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                if (!inputRef.current) return;
                inputRef.current.value = '';
              }}
            >
              <Trash className="size-4" />
            </Button>
          ) : (
            <Button size="icon" className="h-8">
              <Check className="size-4" />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
};
