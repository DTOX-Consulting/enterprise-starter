const { extraneousModules } = require('./eslint_helpers');
const { sharedRules } = require('./shared_eslint_rules');

/**
 * @type {import('eslint').Linter.Config}
 * */
const extendedRules = {
  'regex/invalid': ['error', [...sharedRules['regex/invalid']]],

  'jsdoc/no-types': 'error',
  'jsdoc/require-description': 'error',
  'jsdoc/require-returns-description': 'error',
  'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
  'jsdoc/check-param-names': ['error', { checkDestructured: false }],

  'sonarjs/max-switch-cases': 'error',
  'sonarjs/no-all-duplicated-branches': 'error',
  'sonarjs/no-collapsible-if': 'error',
  'sonarjs/no-collection-size-mischeck': 'error',
  'sonarjs/no-duplicated-branches': 'error',
  'sonarjs/no-element-overwrite': 'error',
  'sonarjs/no-empty-collection': 'error',
  'sonarjs/no-extra-arguments': 'error',
  'sonarjs/no-ignored-return': 'error',
  'sonarjs/no-gratuitous-expressions': 'error',
  'sonarjs/cognitive-complexity': 'error',
  'sonarjs/no-identical-conditions': 'error',
  'sonarjs/no-identical-expressions': 'error',
  'sonarjs/prefer-immediate-return': 'error',
  'sonarjs/no-inverted-boolean-check': 'error',
  'sonarjs/no-nested-switch': 'error',
  'sonarjs/no-one-iteration-loop': 'error',
  'sonarjs/no-redundant-boolean': 'error',
  'sonarjs/no-redundant-jump': 'error',
  'sonarjs/no-same-line-conditional': 'error',
  'sonarjs/no-small-switch': 'error',
  'sonarjs/no-unused-collection': 'error',
  'sonarjs/no-use-of-empty-return-value': 'error',
  'sonarjs/no-useless-catch': 'error',
  'sonarjs/non-existent-operator': 'error',
  'sonarjs/prefer-object-literal': 'error',
  'sonarjs/prefer-while': 'error',

  'eslint-comments/no-unused-disable': 'error',
  'eslint-comments/no-unlimited-disable': 'error',

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
  'import/no-namespace': 'error',
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
      allow: [
        '**/*.css',
        '@/styles/tracing',
        '@/les/utils/source_maps',
        '@Tests/utils/module_mocks',
        '@/les/scripts/build_cache_map/tracing_mock',
        '@/les/db/setup_pools_from_env'
      ]
    }
  ],
  'import/order': [
    'error',
    {
      'newlines-between': 'always',
      warnOnUnassignedImports: true,
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type']
    }
  ],

  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'error',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }
  ],

  'n/no-process-env': 'error',
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
  ]
};

module.exports = { extendedRules };
