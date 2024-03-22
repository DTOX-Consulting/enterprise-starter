/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  tabWidth: 2,
  semi: true,
  useTabs: false,
  printWidth: 100,
  endOfLine: 'lf',
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  bracketSameLine: false,
  plugins: ['prettier-plugin-tailwindcss']
  // plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  // importOrderSeparation: false,
  // importOrderSortSpecifiers: true,
  // importOrderBuiltinModulesToTop: true,
  // importOrderMergeDuplicateImports: true,
  // importOrderCombineTypeAndValueImports: true,
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrder: [
  //   '^(react/(.*)$)|^(react$)',
  //   '^(next/(.*)$)|^(next$)',
  //   '<THIRD_PARTY_MODULES>',
  //   '',
  //   '^types$',
  //   '^@/env(.*)$',
  //   '^@/types/(.*)$',
  //   '^@/config/(.*)$',
  //   '^@/lib/(.*)$',
  //   '^@/lib/hooks/(.*)$',
  //   '^@/components/ui/(.*)$',
  //   '^@/components/(.*)$',
  //   '^@/styles/(.*)$',
  //   '^@/app/(.*)$',
  //   '',
  //   '^[./]'
  // ]
};

export default config;
