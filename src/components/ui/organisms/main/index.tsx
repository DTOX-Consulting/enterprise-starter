import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => {
  return <main className="w-full flex-auto">{children}</main>;
};
