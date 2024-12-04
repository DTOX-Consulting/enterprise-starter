import Link from 'next/link';

import { Button } from '@/components/ui/atoms/button';
import { Container } from '@/components/ui/atoms/container';
import { StatList, StatListItem } from '@/components/ui/molecules/stat-list';
import { LP_GRID_ITEMS } from '@/components/ui/organisms/social/lp-items';

export default function About() {
  return (
    <Container className="mt-20">
      <Container>
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Next.js Enterprise Starter
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-11 dark:text-graydark-11 md:text-lg lg:mb-8 lg:text-xl">
              Jumpstart your enterprise project with our feature-packed, high-performance Next.js
              starter! Experience rapid UI development, AI-powered code reviews, and an extensive
              suite of tools for a smooth and enjoyable development process.
            </p>
            <Button asChild>
              <Link href="https://github.com/DTOX-Consulting/enterprise-starter" className="mr-3">
                Get started
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://vercel.com/new/git/external?repository-url=https://github.com/DTOX-Consulting/enterprise-starter">
                Deploy Now
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div
                key={singleItem.title}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-full p-1.5 text-blue-7 lg:size-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-11 dark:text-graydark-11">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="my-16 text-center">
        <StatList>
          <StatListItem value="10+" label="Years in Business" />
          <StatListItem value="10M+" label="Lines of Code Written" />
          <StatListItem value="1000+" label="Happy Clients" />
        </StatList>
      </Container>
    </Container>
  );
}
