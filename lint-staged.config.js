export default {
  '*': [() => 'pnpm format'],
  '*.{ts,tsx,js,jsx,json}': [
    () => 'pnpm typecheck',
    (/** @type {string[]} */ files) => `pnpm cross-env CI=true pnpm lint ${files.join(' ')}`
  ]
};
