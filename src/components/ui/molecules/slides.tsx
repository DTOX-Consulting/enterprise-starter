'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/atoms/button';
import { cn } from '@/lib/utils';

type Slide = {
  title: string;
  element: JSX.Element;
};

export default function Slides({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative w-full max-w-[calc(100%-2rem)]">
      <div className="aspect-video flex h-28 animate-fade-down overflow-hidden rounded-lg px-4 duration-500">
        {slides.map((slide, index) => {
          return (
            <div
              key={slide.title}
              className={cn(
                'tex-ellipsis flex w-0 grow overflow-hidden text-clip transition-[width] duration-500 ease-in-out',
                {
                  'w-full': currentIndex === index,
                  invisible: currentIndex !== index
                }
              )}
            >
              {slide.element}
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 -mx-3 -ml-4 flex items-center justify-between">
        <Button size="icon" variant="ghost" onClick={handlePrevious} disabled={currentIndex === 0}>
          <ChevronLeft className="size-8" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
        >
          <ChevronRight className="size-8" />
        </Button>
      </div>
    </div>
  );
}
