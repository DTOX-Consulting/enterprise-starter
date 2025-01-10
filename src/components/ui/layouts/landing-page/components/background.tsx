import Image from 'next/image';

import home from '@/components/ui/layouts/landing-page/assets/bg.png';

export default function Background() {
  return (
    <Image
      src={home}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-primary-dark"
      alt="Beautiful house"
      quality={100}
      priority
    />
  );
}
