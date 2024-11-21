export default {
  '*': [() => 'pnpm format'],
  'package.json': [() => 'pnpm lint:package'],
  '*.{ts,tsx,js,jsx,json}': [
    () => 'pnpm typecheck',
    (/** @type {string[]} */ files) => `pnpm cross-env CI=true pnpm lint ${files.join(' ')}`
  ]
};
