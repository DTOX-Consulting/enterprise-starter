import { FadeIn } from '@/components/animations/fade-in';

import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => (
  <FadeIn className="flex size-full overflow-auto">
    <main className="flex size-full flex-col">{children}</main>
  </FadeIn>
);
