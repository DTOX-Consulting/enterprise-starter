'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAtBottom } from '@/lib/hooks/use-at-bottom';

type ChatScrollAnchorProps = {
  trackVisibility?: boolean;
};

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom();

  const { ref, entry, inView } = useInView({
    delay: 100,
    trackVisibility,
    rootMargin: '0px 0px -150px 0px'
  });

  useEffect(() => {
    if (Boolean(isAtBottom) && Boolean(trackVisibility) && !Boolean(inView)) {
      entry?.target.scrollIntoView({
        block: 'start'
      });
    }
  }, [inView, entry, isAtBottom, trackVisibility]);

  return <div ref={ref} className="h-px w-full" />;
}
