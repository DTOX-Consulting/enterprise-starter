module.exports = {
  '*': [() => 'bun format'],
  '*.{ts,tsx,js,jsx,json}': [() => 'bun typecheck', () => 'bun cross-env CI=true bun lint']
};
