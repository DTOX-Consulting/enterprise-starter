import Link from 'next/link';

import { GridPattern } from '@/components/animations/grid-pattern';
import { ContainerAnimated } from '@/components/ui/atoms/container';
// import { ComingSoonCheckbox } from '@/components/ui/layouts/default/coming-soon-checkbox';
import { routes } from '@/config/navigation/routes';

export default function ComingSoon() {
  return (
    <div className="relative flex flex-auto items-center">
      <GridPattern
        className="absolute inset-x-0 -z-10 size-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        interactive
      />
      <ContainerAnimated className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-32">
        <p className="rounded-full px-4 py-1 text-xl font-medium tracking-tight text-slate-900 dark:text-neutral-100">
          🎉 🎉 🎉
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold text-slate-900 dark:text-neutral-100 sm:text-6xl">
          Coming Soon
        </h1>
        <p className="mt-6 text-2xl tracking-tight text-slate-700 dark:text-neutral-100">
          We&apos;re working hard to bring you something amazing! 🚀
        </p>
        {/* <p className="mt-4 flex items-center text-lg tracking-tight text-slate-700 dark:text-neutral-100">
          <span className="inline-block space-x-2">
            <ComingSoonCheckbox />
            <span className="relative bottom-0.5 inline-block place-self-start">
              Sign up to get notified when this will be available.
            </span>
          </span>
        </p> */}
        <Link
          href={routes.home}
          className="mt-6 text-base font-medium text-blue-600 hover:text-blue-800"
        >
          <span>Go back home&nbsp;</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </ContainerAnimated>
    </div>
  );
}
