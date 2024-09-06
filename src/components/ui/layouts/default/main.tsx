import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => (
  <main className="mt-16 flex size-full">{children}</main>
);
