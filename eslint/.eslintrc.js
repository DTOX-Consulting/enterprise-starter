/* eslint-disable n/no-unsupported-features/es-syntax -- we use newer version of node */
const { baseRules } = require('./base_rules');
const { extendedRules } = require('./extended_rules');
const { createTypescriptOverrides } = require('./typescript_rules');
const { jsExtensions, tsExtensions, tryExtensions, ignorePatterns } = require('./eslint_helpers');

/**
 * @type {import('eslint').Linter.Config}
 * */
module.exports = {
  root: true,
  ignorePatterns,
  plugins: [
    'node',
    'babel',
    'jsdoc',
    'regex',
    'import',
    'promise',
    'sonarjs',
    'prettier',
    'deprecation',
    'unused-imports',
    'eslint-comments'
  ],
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    es6: true,
    node: true,
    jest: true,
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
