import Link from 'next/link';

import { ScrollArea } from '@/components/ui/atoms/scroll-area';
import { cn } from '@/lib/utils';

import type { FC } from 'react';

// Define types for links and sections
type LinkProps = {
  href: string;
  text: string;
  isNew?: boolean;
};

type SectionProps = {
  title: string;
  links: LinkProps[];
};

// Sample data structure for sections and links
const sections: SectionProps[] = [
  {
    title: 'Getting Started',
    links: [
      { text: 'Introduction', href: '/docs' },
      { text: 'Installation', href: '/docs/installation' },
      { text: 'components.json', href: '/docs/components-json' },
      { text: 'Theming', href: '/docs/theming' },
      { text: 'Dark mode', href: '/docs/dark-mode' },
      { text: 'CLI', href: '/docs/cli' },
      { text: 'Typography', href: '/docs/components/typography' },
      { text: 'Figma', href: '/docs/figma' },
      { text: 'Changelog', href: '/docs/changelog' }
    ]
  },
  {
    title: 'Components',
    links: [
      { text: 'Accordion', href: '/docs/components/accordion' },
      { text: 'Alert', href: '/docs/components/alert' },
      { text: 'Alert Dialog', href: '/docs/components/alert-dialog' },
      { text: 'Aspect Ratio', href: '/docs/components/aspect-ratio' },
      { text: 'Avatar', href: '/docs/components/avatar' },
      { text: 'Badge', href: '/docs/components/badge' },
      { text: 'Breadcrumb', href: '/docs/components/breadcrumb', isNew: true },
      { text: 'Button', href: '/docs/components/button' },
      { text: 'Calendar', href: '/docs/components/calendar' },
      { text: 'Card', href: '/docs/components/card' },
      { text: 'Carousel', href: '/docs/components/carousel' },
      { text: 'Checkbox', href: '/docs/components/checkbox' },
      { text: 'Collapsible', href: '/docs/components/collapsible' },
      { text: 'Combobox', href: '/docs/components/combobox' },
      { text: 'Command', href: '/docs/components/command' },
      { text: 'Context Menu', href: '/docs/components/context-menu' },
      { text: 'Data Table', href: '/docs/components/data-table' },
      { text: 'Date Picker', href: '/docs/components/date-picker' },
      { text: 'Dialog', href: '/docs/components/dialog' },
      { text: 'Drawer', href: '/docs/components/drawer' },
      { text: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
      { text: 'Form', href: '/docs/components/form' },
      { text: 'Hover Card', href: '/docs/components/hover-card' },
      { text: 'Input', href: '/docs/components/input' },
      { text: 'Input OTP', href: '/docs/components/input-otp', isNew: true },
      { text: 'Label', href: '/docs/components/label' },
      { text: 'Menubar', href: '/docs/components/menubar' },
      { text: 'Navigation Menu', href: '/docs/components/navigation-menu' },
      { text: 'Pagination', href: '/docs/components/pagination' },
      { text: 'Popover', href: '/docs/components/popover' },
      { text: 'Progress', href: '/docs/components/progress' },
      { text: 'Radio Group', href: '/docs/components/radio-group' },
      { text: 'Resizable', href: '/docs/components/resizable' },
      { text: 'Scroll Area', href: '/docs/components/scroll-area' },
      { text: 'Select', href: '/docs/components/select' },
      { text: 'Separator', href: '/docs/components/separator' },
      { text: 'Sheet', href: '/docs/components/sheet' },
      { text: 'Skeleton', href: '/docs/components/skeleton' },
      { text: 'Slider', href: '/docs/components/slider' },
      { text: 'Sonner', href: '/docs/components/sonner' },
      { text: 'Switch', href: '/docs/components/switch' },
      { text: 'Table', href: '/docs/components/table' },
      { text: 'Tabs', href: '/docs/components/tabs' },
      { text: 'Textarea', href: '/docs/components/textarea' },
      { text: 'Toast', href: '/docs/components/toast' },
      { text: 'Toggle', href: '/docs/components/toggle' },
      { text: 'Toggle Group', href: '/docs/components/toggle-group' },
      { text: 'Tooltip', href: '/docs/components/tooltip' }
    ]
  }
];

// Link component
const CustomLink: FC<LinkProps> = ({ href, text, isNew }) => (
  <Link
    href={href}
    className={cn(
      'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
      {
        'font-medium text-foreground': Boolean(isNew),
        'text-muted-foreground': !isNew
      }
    )}
  >
    {text}
    {Boolean(isNew) && (
      <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
        New
      </span>
    )}
  </Link>
);

// Section component
const Section: FC<SectionProps> = ({ title, links }) => (
  <div className="pb-4">
    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{title}</h4>
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {links.map((link) => (
        <CustomLink key={link.href} {...link} />
      ))}
    </div>
  </div>
);

// Sidebar component
export const Sidebar: FC = () => (
  <ScrollArea className="h-[calc(100vh-10rem)] rounded-md border p-4">
    <aside className="w-full md:sticky md:block">
      <div dir="ltr" className="relative h-full overflow-hidden pr-6">
        <div className="size-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
          <div style={{ minWidth: '100%', display: 'table' }}>
            <div className="w-full">
              {sections.map((section) => (
                <Section key={section.title} {...section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  </ScrollArea>
);
