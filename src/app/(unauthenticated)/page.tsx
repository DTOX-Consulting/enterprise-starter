import { MoveDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import home from '@/assets/images/home.jpg';
import { FadeIn } from '@/components/animations/fade-in';
import { Container } from '@/components/ui/atoms/container';

function Arrow() {
  return (
    <Link href="/#intro" target="_self" className="vertical horizontal center mt-8 flex">
      <MoveDown size={80} />
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FadeIn>
        <div className="relative flex flex-col overflow-x-hidden">
          <Image
            className="w-screen brightness-75 lg:h-screen"
            src={home}
            alt="Home"
            width={2560}
            height={1706}
          />
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white lg:block">
            <div className="space-y-4 rounded-xl bg-gradient-to-b from-background/10 via-background/10 to-background/80 p-8 backdrop-blur-xl">
              <p className="font-mont-alt text-5xl">Enterprise Starter</p>
            </div>
          </div>

          <div className="absolute bottom-48 left-1/2 hidden -translate-x-1/2 text-white lg:block">
            <p className="font-mont-alt text-2xl font-bold">Let&apos;s Explore</p>
            <Arrow />
          </div>
        </div>
      </FadeIn>

      <Container className="pt-16" id="intro">
        <FadeIn>
          <div className="p-8">
            <h1 className="mb-4 text-3xl font-bold">Your Title Here</h1>
            <p className="mb-6 text-lg font-bold">Your Subtitle Here</p>
            <p className="mb-6">
              Your introductory text goes here. Customize it to convey your brand&apos;s message and
              values.
            </p>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sagittis nisi ac
              ultricies semper.
            </p>
            <p className="mb-6">
              Sed vehicula facilisis tortor, eget congue ex fermentum sit amet.
            </p>
            <p className="mb-6">
              Curabitur eget augue sit amet felis bibendum fermentum. Proin tincidunt euismod leo,
              vel venenatis erat interdum sit amet.
            </p>
            <p className="mb-6">
              Aenean at quam ac odio fermentum tincidunt. Nulla facilisi. In hac habitasse platea
              dictumst.
            </p>
            <p className="mb-6">
              Vivamus euismod fringilla purus, in lacinia ex finibus et. Nunc lacinia velit at quam
              consequat, vel ullamcorper libero tincidunt.
            </p>
            <h2 className="mb-4 text-xl font-bold">Another Subtitle</h2>
            <p className="mb-6">
              Fusce commodo, tortor vitae facilisis tristique, turpis felis commodo dolor, vel
              placerat elit sem a libero.
            </p>
            <p className="mb-6">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae; In vel varius lacus.
            </p>
            <p className="mb-6">
              Integer convallis, urna id lacinia varius, libero arcu vestibulum purus.
            </p>
            <p className="mb-6">
              Phasellus nec libero vel lectus cursus aliquet sit amet vitae velit.
            </p>
            <p className="mb-6">
              Suspendisse potenti. Duis luctus urna vel ullamcorper scelerisque.
            </p>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
