'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { routes } from '@/config/navigation/routes';
import { api } from '@/trpc/react';

export default function Callback() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('next');
  const successRoute = redirectPath ?? routes.dashboard;

  api.auth.callback.useQuery(undefined, {
    retry: 3,
    retryDelay: 500,
    onSuccess: ({ success }) => success && router.push(successRoute),
    onError: (err) => err.data?.code === 'UNAUTHORIZED' && router.push(routes.login)
  });

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-8" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
