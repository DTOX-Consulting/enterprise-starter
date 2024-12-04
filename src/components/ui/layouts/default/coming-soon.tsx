import Link from 'next/link';

import { GridPattern } from '@/components/animations/grid-pattern';
import { ContainerAnimated } from '@/components/ui/atoms/container';
import { routes } from '@/config/navigation/routes';

export default function ComingSoon() {
  return (
    <div className="relative flex flex-auto items-center">
      <GridPattern
        className="absolute inset-x-0 -z-10 size-full fill-gray-50 stroke-gray-10/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
        interactive
      />
      <ContainerAnimated className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-32">
        <p className="rounded-full px-4 py-1 text-xl font-medium tracking-tight text-slate-9 dark:text-gray-11">
          🎉 🎉 🎉
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold text-slate-9 dark:text-gray-11 sm:text-6xl">
          Coming Soon
        </h1>
        <p className="mt-6 text-2xl tracking-tight text-slate-7 dark:text-gray-11">
          We&apos;re working hard to bring you something amazing! 🚀
        </p>
        {/* <p className="mt-4 flex items-center text-lg tracking-tight text-slate-7 dark:text-gray-11">
          <span className="inline-block space-x-2">
            <ComingSoonCheckbox />
            <span className="relative bottom-0.5 inline-block place-self-start">
              Sign up to get notified when this will be available.
            </span>
          </span>
        </p> */}
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
