import { HeaderContainer } from '@/components/ui/layouts/default/header-container';
import { Navigation } from '@/components/ui/layouts/default/navigation';

import type { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => (
  <HeaderContainer>
    {children}
    <Navigation />
  </HeaderContainer>
);
