const {
  jsExtensions,
  tsExtensions,
  tryExtensions,
  ignorePatterns,
  extraneousModules
} = require('./eslint/eslint_helpers');

/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  ignorePatterns,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  plugins: [
    'n',
    'import',
    'promise',
    'prettier',
    'deprecation',
    'tailwindcss',
    '@typescript-eslint',
    'oxlint'
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@typescript-eslint/recommended-type-checked',
    'next'
  ],
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: false
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts'
    },
    node: {
      tryExtensions,
      allowModules: []
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        extensions: tsExtensions
      },
      node: {
        extensions: jsExtensions
      }
    }
  },
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: { attributes: false }
      }
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowNumber: true,
        allowString: true,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: false,
        allowAny: true
      }
    ],

    // ================================================================================ //
    'prettier/prettier': 'error',
    'tailwindcss/no-custom-classname': 'off',

    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/no-unlimited-disable': 'error',

    'n/no-process-env': 'off',
    'n/no-missing-import': 'off',
    'n/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules', 'dynamicImport', 'optionalCatchBinding']
      }
    ],
    'n/no-extraneous-require': [
      'error',
      {
        allowModules: extraneousModules
      }
    ],
    'n/no-extraneous-import': [
      'error',
      {
        allowModules: extraneousModules,
        resolvePaths: [__dirname]
      }
    ],

    'promise/always-return': 'warn',
    'promise/catch-or-return': 'warn',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/no-callback-in-promise': 'off',

    'import/named': 'off',
    'import/default': 'off',
    'import/first': 'error',
    'import/no-cycle': 'off',
    'import/export': 'error',
    'import/namespace': 'off',
    'import/exports-last': 'off',
    'import/no-namespace': 'off',
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
    'import/no-deprecated': 'error',
    'import/no-self-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-named-as-default': 'error',
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default-member': 'error',

    'import/extensions': [
      'error',
      'never',
      {
        json: 'always'
      }
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true
      }
    ],
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['**/*.css']
      }
    ],

    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '@/styles/**',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: 'vitest',
            group: 'builtin',
            position: 'before'
          },
          {
            pattern: '@/',
            group: 'internal',
            position: 'before'
          }
        ]
      }
    ]
  },
  overrides: [
    {
      plugins: ['vitest'],
      extends: ['plugin:vitest/all'],
      files: ['*.test.{ts,tsx}']
    },
    {
      files: ['./src/hooks/useSelector/useSelector.ts'],
      rules: {
        'import/no-deprecated': 'off'
      }
    }
  ]
};

module.exports = config;
