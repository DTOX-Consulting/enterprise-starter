'use client';

import { ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ReactScrollToTop from 'react-scroll-to-top';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <ReactScrollToTop
      className="vertical center dark:bg-inherit dark:text-neutral-400"
      component={<ArrowUp size={36} />}
      smooth
    />
  );
}
