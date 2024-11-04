import Link from 'next/link';

import { name, socialMedia } from '@/app/metadata';
import { cn } from '@/lib/utils';

import type { ComponentPropsWithoutRef } from 'react';

function FacebookIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <title>Facebook</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z"
      />
    </svg>
  );
}

function DribbleIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <title>Dribble</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2Zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.42 25.42 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362ZM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.688 8.688 0 0 1 12 3.475Zm-3.633.803a53.889 53.889 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975ZM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.523 8.523 0 0 1-2.191-5.705ZM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.32 35.32 0 0 1 1.823 6.475 8.402 8.402 0 0 1-3.341.684Zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715Z"
      />
    </svg>
  );
}

function InstagramIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <title>Instagram</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 0 1-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63Zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.096 3.096 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058ZM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27Zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"
      />
    </svg>
  );
}

function TwitterIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <title>Twitter</title>
      <path d="M8.29 20.253c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.922a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743A11.65 11.65 0 0 1 3.392 4.75a4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.715v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.232 8.232 0 0 1 2 18.41a11.616 11.616 0 0 0 6.29 1.84" />
    </svg>
  );
}

function GitHubIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <title>Github</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      aria-hidden="true"
      fill="#000000"
      height="24px"
      width="24px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 455 455"
      {...props}
    >
      <title>Linkedin</title>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M246.4,204.35v-0.665c-0.136,0.223-0.324,0.446-0.442,0.665H246.4z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0,0v455h455V0H0z M141.522,378.002H74.016V174.906h67.506V378.002z
            M107.769,147.186h-0.446C84.678,147.186,70,131.585,70,112.085c0-19.928,15.107-35.087,38.211-35.087
            c23.109,0,37.31,15.159,37.752,35.087C145.963,131.585,131.32,147.186,107.769,147.186z M385,378.002h-67.524V269.345
            c0-27.291-9.756-45.92-34.195-45.92c-18.664,0-29.755,12.543-34.641,24.693c-1.776,4.34-2.24,10.373-2.24,16.459v113.426h-67.537
            c0,0,0.905-184.043,0-203.096H246.4v28.779c8.973-13.807,24.986-33.547,60.856-33.547c44.437,0,77.744,29.02,77.744,91.398V378.002
            z"
        />
      </g>
    </svg>
  );
}

function RSSIcon(props: Readonly<ComponentPropsWithoutRef<'svg'>>) {
  return (
    <svg
      x="0px"
      y="0px"
      version="1.1"
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
      {...props}
    >
      <title>RSS</title>
      <g>
        <g>
          <path
            fill="#000000"
            d="M128,10C62.8,10,10,62.8,10,128c0,65.2,52.8,118,118,118c65.2,0,118-52.8,118-118C246,62.8,193.2,10,128,10z M81.3,186.6c-6.7,0-12.1-5.4-12.1-12.1s5.4-12.1,12.1-12.1c6.7,0,12.1,5.4,12.1,12.1S87.9,186.6,81.3,186.6z M129.6,186.9c0-33.4-27.2-60.6-60.6-60.6v-25.5c47.6,0,86.1,38.6,86.1,86.1H129.6L129.6,186.9z M175.9,186.9c0-59-48-107-107-107V54.3c73.2,0,132.5,59.3,132.5,132.5L175.9,186.9L175.9,186.9z"
          />
        </g>
      </g>
    </svg>
  );
}

const icons = {
  Rss: RSSIcon,
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
  Dribble: DribbleIcon,
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon
} as const;

export const socialMediaProfiles = Object.entries(socialMedia).map(([title, href]) => ({
  icon: icons[title as keyof typeof socialMedia],
  title,
  href
}));

export function SocialMedia({
  className,
  invert = false
}: Readonly<{
  className?: string;
  invert?: boolean;
}>) {
  return (
    <ul
      className={cn(
        'flex gap-x-10',
        invert ? 'text-white dark:text-neutral-950' : 'text-neutral-950 dark:text-neutral-200',
        className
      )}
    >
      {socialMediaProfiles.map((socialMediaProfile) => (
        <li key={socialMediaProfile.title}>
          <Link
            target="_blank"
            href={socialMediaProfile.href}
            aria-label={socialMediaProfile.title}
            className={cn(
              'transition',
              invert
                ? 'hover:text-neutral-200 dark:hover:text-neutral-700'
                : 'hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-gray-500'
            )}
          >
            <socialMediaProfile.icon className="size-6 fill-current" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Copyright() {
  return (
    <p className="text-center text-xs leading-5 text-gray-500">
      &copy; {new Date().getFullYear()} {name}. All rights reserved.
    </p>
  );
}
