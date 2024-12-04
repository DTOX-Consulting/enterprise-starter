import Link from 'next/link';

import { ContainerAnimated } from '@/components/ui/atoms/container';
import { SimpleGridPattern } from '@/components/ui/molecules/simple-grid-pattern';
import { routes } from '@/config/navigation/routes';

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="relative flex flex-auto items-center">
      <div className="absolute inset-0 -z-10 text-slate-9/10 [mask-image:linear-gradient(transparent,white,transparent)]">
        <SimpleGridPattern x="50%" y="50%" patternTransform="translate(0 60)" />
      </div>
      <ContainerAnimated className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-32">
        <p className="rounded-full px-4 py-1 text-base font-medium tracking-tight text-slate-9 ring-1 ring-inset ring-slate-9 dark:text-gray-11">
          404
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold text-slate-9 dark:text-gray-11 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg tracking-tight text-slate-7 dark:text-gray-11">
          {"Sorry, we couldn't find the page you're looking for."}
        </p>
        <Link
          href={routes.home}
          className="mt-6 text-base font-medium text-blue-6 hover:text-blue-8"
        >
          <span>Go back home&nbsp;</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </ContainerAnimated>
    </div>
  );
}
