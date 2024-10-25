'use server';

import { G } from '@mobily/ts-belt';

const adminUsers: string[] = [];

export const isAdminUser = async (email?: string) => {
  if (G.isNullable(email)) {
    return Promise.resolve(false);
  }

  const value = adminUsers.length > 0 && adminUsers.includes(email);
  return Promise.resolve(value);
};
