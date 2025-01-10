import { BLURB_TEXT } from '@/components/ui/layouts/landing-page/components/constants';

export default function Blurb() {
  return (
    <p className="text-center text-lg font-light leading-relaxed max-w-xl mb-8 text-white">
      {BLURB_TEXT}
    </p>
  );
}
