import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => {
  return <main className="mt-16 flex size-full">{children}</main>;
};
