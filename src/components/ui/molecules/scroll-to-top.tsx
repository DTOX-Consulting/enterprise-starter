'use client';

import { ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactScrollToTop from 'react-scroll-to-top';

export function ScrollToTop() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <ReactScrollToTop
      className="vertical center dark:bg-inherit dark:text-gray-4"
      component={<ArrowUp size={40} />}
      smooth
    />
  );
}
