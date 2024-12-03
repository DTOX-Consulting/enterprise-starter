import React, { type FC, type JSX } from 'react';

import { cn } from '@/lib/utils';

type TimelineItem = {
  id: string;
  date: string;
  label?: string;
  icon?: JSX.Element;
  title: string | JSX.Element;
  content: string | JSX.Element;
};

type VerticalTimelineProps = {
  items: TimelineItem[];
};

const VerticalTimeline1: FC<VerticalTimelineProps> = ({ items }) => (
  <div className="mx-auto w-full max-w-3xl">
    <div className="-my-6">
      {items.map((item, index) => (
        <div key={item.id} className="group relative py-6 pl-8 sm:pl-32">
          <div className="font-caveat mb-1 font-medium text-indigo-5 sm:mb-0">{item.label}</div>
          <div
            className={cn(
              'mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-3 before:px-px after:absolute after:left-2 after:box-content after:size-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 after:bg-indigo-100 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]',
              {
                'after:bg-indigo-6': index === 0
              }
            )}
          >
            <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-6 sm:absolute sm:mb-0">
              {item.date}
            </time>
            <div className="flex items-center">
              <div className="text-sm font-bold">{item.title}</div>
              <div>{item.icon}</div>
            </div>
          </div>
          <div className="text-xs text-gray-5 dark:text-gray-2">{item.content}</div>
        </div>
      ))}
    </div>
  </div>
);

const VerticalTimeline2: FC<VerticalTimelineProps> = ({ items }) => (
  <div className="mx-auto w-full max-w-3xl">
    <div className="relative space-y-8 before:absolute before:inset-0 before:z-0 before:-mx-3.5 before:ml-5 before:self-start before:border-l before:border-slate-3">
      {items.map((item) => (
        <div key={item.id} className="relative py-6 pl-8 sm:pl-32">
          <div className="mb-1 flex flex-col items-start sm:flex-row">
            <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-6 sm:absolute sm:mb-0">
              {item.date}
            </time>
            <div className="text-sm font-bold">{item.title}</div>
          </div>
          <div className="text-xs text-gray-5 dark:text-gray-2">{item.content}</div>
        </div>
      ))}
    </div>
  </div>
);

const VerticalTimeline3: FC<VerticalTimelineProps> = ({ items }) => (
  <div className="mx-auto w-full max-w-3xl">
    <div className="-my-6">
      {items.map((item, index) => (
        <div key={item.id} className="group relative py-6 pl-8 sm:pl-32">
          <div className="font-caveat mb-1 font-medium text-indigo-5 sm:mb-0">{item.label}</div>
          <div
            className={cn(
              'mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-slate-3 before:px-px after:absolute after:left-2 after:box-content after:size-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50 after:bg-indigo-100 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]',
              {
                'after:bg-indigo-6': index === 0
              }
            )}
          >
            <time className="left-0 mb-3 inline-flex h-6 w-20 translate-y-0.5 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-6 sm:absolute sm:mb-0">
              {item.date}
            </time>
            <div className="text-sm font-bold">{item.title}</div>
          </div>
          <div className="text-xs text-gray-5 dark:text-gray-2">{item.content}</div>
        </div>
      ))}
    </div>
  </div>
);

export { VerticalTimeline1, VerticalTimeline2, VerticalTimeline3 };
