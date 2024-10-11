'use client';

import { appRouterSsrErrorHandler, type AppRouterErrorProps } from '@highlight-run/next/ssr';

import { Button } from '@/components/ui/atoms/button';
import { logger } from '@/lib/logger/console';

export default appRouterSsrErrorHandler(({ error, reset }: AppRouterErrorProps) => {
  logger.error('An unexpected error occurred', { error });

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto size-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-muted-foreground">
          We&apos;re sorry, but an unexpected error has occurred. Please try again later or contact
          support if the issue persists.
        </p>
        <div className="mt-6">
          <Button
            type="reset"
            onClick={() => reset()} // Attempt to recover by trying to re-render the segment
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
});
