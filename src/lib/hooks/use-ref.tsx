import { useRef as useReactRef } from 'react';

export const useRef = <T extends HTMLElement = HTMLDivElement>(initialValue: T | null = null) => {
  const ref = useReactRef<T>(initialValue);
  const scrollToView = () => ref.current?.scrollIntoView({ behavior: 'smooth' });

  return [ref, scrollToView] as const;
};
