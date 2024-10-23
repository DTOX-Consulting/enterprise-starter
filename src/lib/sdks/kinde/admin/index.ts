'use server';

const adminUsers: string[] = [];

export const isAdminUser = async (email?: string) => {
  const value = Boolean(email) && adminUsers.includes(email as string);
  return Promise.resolve(value);
};
