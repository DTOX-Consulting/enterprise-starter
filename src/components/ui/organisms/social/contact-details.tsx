import Link from 'next/link';

import { email, phone } from '@/app/metadata';
import { Border } from '@/components/animations/border';
import { FadeIn } from '@/components/animations/fade-in';
import { SocialMedia } from '@/components/ui/organisms/social/social-media';

import type { PropsWithChildren } from 'react';

export function ContactDetails({ children }: PropsWithChildren) {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950 dark:text-neutral-200">
        Our Info
      </h2>
      <p className="mt-6 text-base text-gray-500 dark:text-neutral-400">{children}</p>

      <Border className="mt-10 pt-10">
        <h2 className="font-display text-base font-semibold text-neutral-950 dark:text-neutral-200">
          Contact us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Email', 'mailto', email],
            ['Phone', 'tel', phone]
          ].map(([label, type, contact]) => (
            <div key={contact} className="col-span-1">
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`${type}:${contact}`}
                  className="text-gray-500 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-neutral-800"
                >
                  {contact}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-10 pt-10">
        <h2 className="font-display text-base font-semibold text-neutral-950 dark:text-neutral-200">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
}
