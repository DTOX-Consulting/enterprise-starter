import { HeaderContainer } from '@/components/ui/organisms/header/container';
import { Navigation } from '@/components/ui/organisms/navigation';

import type { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <HeaderContainer>
      {children}
      <Navigation />
    </HeaderContainer>
  );
};
