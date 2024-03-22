import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import { email, phone } from '@/app/metadata';
import { Border } from '@/components/animations/border';
import { FadeIn } from '@/components/animations/fade-in';
import { SocialMedia } from '@/components/ui/organisms/social/social-media';

export function ContactDetails({ children }: PropsWithChildren) {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">Our Info</h2>
      <p className="mt-6 text-base text-neutral-600">{children}</p>

      <Border className="mt-10 pt-10">
        <h2 className="font-display text-base font-semibold text-neutral-950">Contact us</h2>
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
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {contact}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-10 pt-10">
        <h2 className="font-display text-base font-semibold text-neutral-950">Follow us</h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  );
}
