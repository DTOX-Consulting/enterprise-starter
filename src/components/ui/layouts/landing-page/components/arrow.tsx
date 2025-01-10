import { SquareArrowDown } from 'lucide-react';
import Link from 'next/link';

import { ARROW_TEXT } from '@/components/ui/layouts/landing-page/components/constants';

export default function Arrow() {
  return (
    <Link
      href="/#intro"
      target="_self"
      className="vertical horizontal center mt-8 flex flex-col items-center justify-center"
    >
      <p className="text-2xl font-light">{ARROW_TEXT}</p>
      <SquareArrowDown size={40} className="mt-4" />
    </Link>
  );
}
