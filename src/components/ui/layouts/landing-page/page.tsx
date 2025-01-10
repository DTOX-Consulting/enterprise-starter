'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { Container } from '@/components/ui/atoms/container';
import Arrow from '@/components/ui/layouts/landing-page/components/arrow';
import Blurb from '@/components/ui/layouts/landing-page/components/blurb';
import Hero from '@/components/ui/layouts/landing-page/components/hero';
import SubscribeForm from '@/components/ui/layouts/landing-page/components/subscribe-form';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FadeIn>
        <div className="relative flex flex-col overflow-x-hidden">
          <Hero />

          <div className="absolute bottom-48 left-1/2 hidden -translate-x-1/2 text-white lg:block">
            <Arrow />
          </div>
        </div>
      </FadeIn>

      <Container className="flex w-full" id="intro">
        <div className="flex flex-col items-center justify-center w-full">
          <Blurb />
          <SubscribeForm />
        </div>
      </Container>
    </div>
  );
}
