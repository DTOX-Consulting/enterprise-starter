import {
  HERO_TITLE_TEXT,
  HERO_SUBTITLE_TEXT
} from '@/components/ui/layouts/landing-page/components/constants';

export default function Hero() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-primary-dark/20" />
      <div className="relative z-10 text-center text-white overflow-hidden">
        <h1 className="mb-4 text-4xl sm:text-6xl md:text-8xl font-futura-book whitespace-nowrap">
          {HERO_TITLE_TEXT}
        </h1>
        <h2 className="font-extralight text-3xl sm:text-4xl md:text-5xl">{HERO_SUBTITLE_TEXT}</h2>
      </div>
    </div>
  );
}
