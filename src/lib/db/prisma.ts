import { PrismaClient } from '@prisma/client';

import { isProd } from '@/lib/env';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: !isProd() ? ['query', 'error', 'warn'] : ['error']
  });

if (!isProd()) globalForPrisma.prisma = db;
