const { tsExtensions } = require('./eslint_helpers');

/**
 * @type {import('eslint').Linter.Config}
 * */
const typescriptRules = {
  'no-void': 'off',
  'no-undef': 'off',
  'no-shadow': 'off',
  'comma-spacing': 'off',
  'no-unused-vars': 'off',
  'no-throw-literal': 'off',
  'import/no-deprecated': 'off',
  'no-restricted-imports': 'off',
  'no-dupe-class-members': 'off',
  'no-useless-constructor': 'off',
  'deprecation/deprecation': 'error',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/ban-types': 'error',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/no-this-alias': 'error',
  '@typescript-eslint/no-extra-semi': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/ban-ts-comment': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-throw-literal': 'error',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-invalid-void-type': 'warn', // needs to turn on
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-dupe-class-members': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/promise-function-async': 'error',
  '@typescript-eslint/no-useless-constructor': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'error',
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
  ], // needs to turn to error
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-meaningless-void-operator': 'error',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unnecessary-type-constraint': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
  '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowBoolean: true
    }
  ],

  '@typescript-eslint/no-confusing-void-expression': [
    // needs to turn on
    'warn',
    {
      ignoreArrowShorthand: true,
      ignoreVoidOperator: true
    }
  ],
  '@typescript-eslint/no-floating-promises': [
    'error',
    {
      ignoreVoid: true,
      ignoreIIFE: true
    }
  ],
  '@typescript-eslint/no-misused-promises': [
    'error',
    {
      checksConditionals: false,
      checksVoidReturn: false
    }
  ],
  '@typescript-eslint/comma-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  '@typescript-eslint/no-unused-vars': [
    'off', // using unused-imports/no-unused-vars
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }
  ],
  '@typescript-eslint/no-explicit-any': [
    'error',
    {
      ignoreRestArgs: false,
      fixToUnknown: false
    }
  ],
  '@typescript-eslint/padding-line-between-statements': [
    'error',
    {
      prev: '*',
      blankLine: 'always',
      next: ['interface', 'type']
    }
  ],
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'typeAlias',
      format: ['UPPER_CASE', 'PascalCase']
    },
    {
      selector: 'typeLike',
      format: ['PascalCase']
    },
    {
      selector: 'enum',
      format: ['UPPER_CASE', 'PascalCase']
    },
    {
      selector: 'enumMember',
      format: ['PascalCase']
    }
  ]
};

/**
 * Create typescript override rules
 *
 * @param {boolean} setProject - Sets project to tsconfig or undefined
 * @param {import('eslint').Linter.Config.RulesRecord} ruleOverrides - Override rules
 * @param {string[]} additionalPlugins - Any additional plugins that you wish to be set
 * @param {string[]} additionalExtensions - Any additional extensions that you wish to be set
 * @returns {import('eslint').Linter.Config} - Eslint config object for .ts and .tsx file extensions
 */
function createTypescriptOverrides(
  setProject = false,
  ruleOverrides = {},
  additionalPlugins = [],
  additionalExtensions = []
) {
  const project = setProject ? 'tsconfig.json' : undefined;

  return {
    files: ['*.{ts,tsx}'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project,
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        legacyDecorators: true
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
          alwaysTryTypes: true,
          extensions: tsExtensions
        }
      },
      'import/parsers': {
        '@typescript-eslint/parser': tsExtensions
      }
    },
    plugins: ['deprecation', '@typescript-eslint', ...additionalPlugins],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ...additionalExtensions
    ],
    rules: {
      ...typescriptRules,
      ...ruleOverrides
    }
  };
}

const heavyRules = [
  'import/no-cycle',
  'import/no-namespace',
  'import/no-deprecated',
  'n/no-extraneous-import',
  'deprecation/deprecation',
  'boundaries/element-types',
  '@sh4res/ban-date-mutation'
];

/**
 * Remove all typescript rules from config
 *
 * @param {import('eslint').Linter.Config} config
 * @returns {import('eslint').Linter.Config} - Config without Typescript rules, plugins and extensions
 */
function removeAllTypescriptRules(config) {
  if (config.parserOptions) {
    Reflect.deleteProperty(config.parserOptions, 'project');
    Reflect.deleteProperty(config.parserOptions, 'createDefaultProgram');
  }

  if (config.plugins) {
    config.plugins = config.plugins.filter((plugin) => !plugin.includes('@typescript-eslint'));
  }

  if (config.extends) {
    config.extends = config.extends.filter((plugin) => !plugin.includes('@typescript-eslint'));
  }

  if (config.rules) {
    Object.keys(config.rules).forEach((rule) => {
      if (rule.includes('@typescript-eslint') && !rule.includes('no-unused-vars')) {
        Reflect.deleteProperty(config.rules, rule);
      }

      if (heavyRules.includes(rule)) {
        config.rules[rule] = 'off';
      }
    });
  }

  if (config.overrides) {
    config.overrides.forEach(removeAllTypescriptRules);
  }

  return config;
}

module.exports = {
  typescriptRules,
  removeAllTypescriptRules,
  createTypescriptOverrides
};
