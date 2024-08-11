import { DialogClose } from '@radix-ui/react-dialog';
import { Lock } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/atoms/button';
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from '@/components/ui/atoms/dialog';
import { routes } from '@/config/navigation/routes';

import type { PropsWithChildren } from 'react';

export function UpgradeModal({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="group relative block">
          <Button
            variant="outline"
            className="z-5 absolute size-full min-h-8 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-60"
          >
            <Lock className="mr-2 size-5" />
            <span>Upgrade to Access</span>
          </Button>
          <span className="block opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            {children}
          </span>
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <span className="flex flex-col items-center justify-center gap-4 py-8">
          <Lock className="size-12 text-primary" />
          <span className="block space-y-4 text-center">
            <DialogTitle>Upgrade to Access This Feature</DialogTitle>
            <DialogDescription className="space-y-2">
              <span className="block">Thanks for considering supporting us!</span>
              <span className="block text-sm">
                Upgrade to unlock this and other advanced features.
              </span>
            </DialogDescription>
          </span>
        </span>
        <DialogFooter>
          <DialogClose asChild>
            <Link className="w-full" href={routes.pricing}>
              <Button variant="pulse" className="w-full">
                Go To Pricing
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Upgrade({ children, hasAccess }: PropsWithChildren<{ hasAccess: boolean }>) {
  if (hasAccess) return <>{children}</>;
  return <UpgradeModal>{children}</UpgradeModal>;
}
