'use client';

import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { api } from '@/trpc/react';

import type { Route } from 'next';

export default function Callback() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  const successRoute = (origin ? `/${origin}` : '/product') as Route<string>;

  api.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(successRoute);
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/kinde');
      }
    },
    retry: 3,
    retryDelay: 500
  });

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="size-8 animate-spin text-zinc-800" />
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
