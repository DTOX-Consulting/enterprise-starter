import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { match } from 'ts-pattern';

import { Button } from '@/components/ui/atoms/button';

const cleanError = (error: string) =>
  match(error)
    .with('HTTP error! status: 404', () => 'Page not found')
    .otherwise(() => error);

export const ErrorPanel = ({
  title = 'Error Loading',
  error
}: {
  title?: string;
  error: { message: string };
}) => {
  const router = useRouter();

  return (
    <div className="flex h-1/3 w-full flex-col items-center justify-center gap-4 rounded-lg border border-red-100 bg-red-50 p-6 text-center">
      <AlertCircle className="size-6 text-red-600" />
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-red-800">{title}</h3>
        <p className="text-sm text-red-600">{cleanError(error.message)}</p>
      </div>
      <Button
        onClick={() => window.location.reload()}
        className="mt-2 rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
      >
        Try Again
      </Button>

      <Button variant="outline" onClick={() => router.push('/help/support')}>
        Contact Support
      </Button>
    </div>
  );
};
