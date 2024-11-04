'use client';

import { useEffect, useState } from 'react';

export default function CountingNumbers({
  value,
  className,
  start = 0,
  duration = 800
}: Readonly<{
  value: number;
  className: string;
  start?: number;
  duration?: number;
}>) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | undefined;
    const animateCount = (timestamp: number) => {
      if (typeof startTime === 'undefined') startTime = timestamp;
      const timePassed = timestamp - startTime;
      const progress = timePassed / duration;
      const currentCount = easeOutQuad(progress, 0, value, 1);
      if (currentCount >= value) {
        setCount(value);
        return;
      }
      setCount(currentCount);
      requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
  }, [value, duration]);

  // eslint-disable-next-line sonarjs/new-cap
  return <p className={className}>{Intl.NumberFormat().format(count)}</p>;
}
const easeOutQuad = (timing: number, begin: number, change: number, duration: number) => {
  const time = timing > duration ? duration : timing / duration;
  return Math.round(-change * time * (time - 2) + begin);
};
