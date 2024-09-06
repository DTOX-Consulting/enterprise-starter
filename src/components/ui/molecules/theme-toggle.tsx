'use client';

import { SunMedium, Moon, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useCallback } from 'react';

import { Button } from '@/components/ui/atoms/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuContent
} from '@/components/ui/atoms/dropdown-menu';
import { cn } from '@/lib/utils';
import { getIframeDocumentElements } from '@/lib/utils/dom';
import { danglingPromise } from '@/lib/utils/promise';

const options = {
  system: {
    label: 'System',
    value: 'system',
    icon: Laptop
  },
  light: {
    label: 'Light',
    value: 'light',
    icon: SunMedium
  },
  dark: {
    label: 'Dark',
    value: 'dark',
    icon: Moon
  }
};

export function useSetIframeTheme(theme: string) {
  const setIframeTheme = useCallback(async () => {
    const elements = await getIframeDocumentElements();
    elements.forEach((element) => element.setAttribute('data-theme', theme));
  }, [theme]);

  useEffect(() => danglingPromise(setIframeTheme()), [setIframeTheme]);
}

export function ThemeToggleMenu() {
  return (
    <DropdownMenu>
      <ThemeToggleTrigger />
      <ThemeToggleContent />
    </DropdownMenu>
  );
}

export function ThemeToggleSubMenu() {
  return (
    <DropdownMenuSub>
      <ThemeToggleTrigger isSubmenu={true} />
      <DropdownMenuPortal>
        <ThemeToggleContent isSubmenu={true} />
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}

export function ThemeToggleMenuHeader() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ThemeToggleIcon className="mt-1" size="lg" />
      </DropdownMenuTrigger>
      <ThemeToggleContent />
    </DropdownMenu>
  );
}

export function ThemeToggleTrigger({ isSubmenu = false }: { isSubmenu?: boolean }) {
  const Comp = isSubmenu ? DropdownMenuSubTrigger : DropdownMenuTrigger;

  return (
    <Comp asChild={!isSubmenu}>
      <div className="flex grow cursor-pointer items-center">
        <ThemeToggleIcon className="mr-2 size-4" size="sm" />
        <span>Theme</span>
      </div>
    </Comp>
  );
}

export const ThemeToggle = () => (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <ThemeToggleRadio />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>
  );

export function ThemeToggleContent({ isSubmenu = false }: { isSubmenu?: boolean }) {
  const { theme, setTheme } = useTheme();
  useSetIframeTheme(theme ?? 'system');

  const Comp = isSubmenu ? DropdownMenuSubContent : DropdownMenuContent;

  return (
    <Comp align="end" asChild={!isSubmenu}>
      {Object.values(options).map(({ label, value, icon: Icon }) => (
        <DropdownMenuItem className="cursor-pointer" key={value} onClick={() => setTheme(value)}>
          <Icon className="mr-2 size-4" />
          <span>{label}</span>
        </DropdownMenuItem>
      ))}
    </Comp>
  );
}

export function ThemeToggleRadio() {
  const { theme, setTheme } = useTheme();
  useSetIframeTheme(theme ?? 'system');

  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      {Object.values(options).map(({ label, value }) => (
        <DropdownMenuRadioItem key={value} value={value} className="cursor-pointer">
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}

export function ThemeToggleIcon({
  className,
  size = 'sm'
}: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8'
  }[size];

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        'px-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        sizeClass,
        className
      )}
    >
      <SunMedium
        className={cn('rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0', sizeClass)}
      />
      <Moon
        className={cn(
          'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
          sizeClass
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
