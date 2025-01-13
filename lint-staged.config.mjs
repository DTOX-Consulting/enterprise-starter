export default {
  '*': [() => 'pnpm format'],
  'package.json': [() => 'pnpm lint:package'],
  '*.{ts,tsx,js,jsx,json}': [
    () => 'pnpm typecheck',
    (/** @type {string[]} */ files) => {
      const fileList = files.map((file) => `"${file}"`).join(' ');
      return `pnpm cross-env CI=true pnpm lint ${fileList}`;
    }
  ]
};
