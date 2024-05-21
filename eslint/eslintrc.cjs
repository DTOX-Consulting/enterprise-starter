const { baseRules } = require('./base_rules');
const { jsExtensions, tsExtensions, tryExtensions, ignorePatterns } = require('./eslint_helpers');
const { extendedRules } = require('./extended_rules');
const { createTypescriptOverrides } = require('./typescript_rules');

/**
 * @type {import('eslint').Linter.Config}
 * */
module.exports = {
  root: true,
  ignorePatterns,
  plugins: [
    'n',
    'jsdoc',
    'regex',
    'import',
    'promise',
    'sonarjs',
    'deprecation',
    'unused-imports',
    'eslint-comments'
  ],
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended'
  ],
  env: {
    es6: true,
    node: true,
    vitest: true,
    commonjs: true,
    browser: false
  },
  settings: {
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
    ...baseRules,
    ...extendedRules
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        'jsdoc/no-types': 'off'
      }
    },
    {
      files: ['*.json'],
      plugins: ['json'],
      extends: ['plugin:json/recommended-with-comments']
    },
    createTypescriptOverrides()
  ]
};
