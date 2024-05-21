import { memo, type FC, type ReactElement, type MemoExoticComponent } from 'react';
import isEqual from 'react-fast-compare';

import type { GenericFunction } from '@/lib/function';

export type MemoFunctionComponent = <P>(
  component: FC<P>,
  propsAreEqual?: (prev: P, next: P) => boolean
) => MemoExoticComponent<FC<P>>;

export const memoize: MemoFunctionComponent = (component, propsAreEqual = isEqual) =>
  memo(component, propsAreEqual);

export type StandardProps = {
  children?: ReactElement;
  hooks?: Record<string, GenericFunction>;
  callbacks?: Record<string, GenericFunction>;
  [key: string]: unknown;
};

export const standardComponent = (component: FC<StandardProps>) =>
  memoize<StandardProps>(component);
