'use server';

const adminUsers = [
  'jai@pulseline.io',
  'jaibeee@gmail.com',
  'matt@pulseline.io',
  'tech@pulseline.io',
  'jflabbett@gmail.com',
  'jennie@pulseline.io',
  'devonte@pulseline.io',
  'devonte.emokpae@gmail.com'
];

export const isAdminUser = async (email?: string) => {
  const value = email ? adminUsers.includes(email) : false;
  return Promise.resolve(value);
};
