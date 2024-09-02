'use server';

const adminUsers: string[] = [];

export const isAdminUser = async (email?: string) => {
  const value = email ? adminUsers.includes(email) : false;
  return Promise.resolve(value);
};
