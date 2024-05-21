/**
 * @type {import('eslint').Linter.Config}
 * */
const baseRules = {
  curly: 'error',
  eqeqeq: 'error',
  'no-var': 'error',
  'no-void': 'error',
  'no-tabs': 'error',
  'no-empty': 'error',
  'no-undef': 'error',
  'no-shadow': 'error',
  'no-console': 'error',
  'sort-imports': 'off', // doesn't work well with 'import/order'
  // 'indent': ['error', 2], // other formatter will handle
  // 'no-undefined': 'warn',
  'no-debugger': 'error',
  'no-lonely-if': 'error',
  'prefer-const': 'error',
  'dot-notation': 'error',
  'comma-spacing': 'error',
  'prefer-spread': 'error',
  'no-delete-var': 'error',
  'no-extra-semi': 'error',
  'no-undef-init': 'error',
  'max-depth': ['error', 5],
  'no-unreachable': 'error',
  complexity: ['error', 10],
  'space-infix-ops': 'error',
  'prefer-template': 'error',
  'prefer-rest-params': 'error',
  // 'no-extra-parens': 'error', // conflicts with other formatter
  semi: ['error', 'always'],
  'no-throw-literal': 'error',
  'no-return-await': 'error',
  'no-useless-call': 'error',
  'max-params': ['error', 5],
  'max-lines': ['error', 500],
  'no-empty-pattern': 'error',
  'no-import-assign': 'error',
  // 'no-magic-numbers': 'warn',
  'no-await-in-loop': 'error',
  'no-global-assign': 'error',
  'no-useless-catch': 'error',
  'no-useless-return': 'error',
  'no-nested-ternary': 'error',
  'no-useless-concat': 'error',
  'no-useless-rename': 'error',
  'func-call-spacing': 'off', // conflicts with other formatter
  'default-param-last': 'error',
  'no-trailing-spaces': 'error',
  '@typescript-eslint/no-restricted-imports': 'error',
  'no-useless-constructor': 'error',
  'max-statements': ['error', 20],
  'eol-last': ['error', 'always'],
  'no-extra-boolean-cast': 'error',
  'comma-style': ['error', 'last'],
  'comma-dangle': ['error', 'never'],
  'arrow-parens': ['error', 'always'],
  'max-nested-callbacks': ['warn', 3],
  'no-async-promise-executor': 'error',
  'quote-props': ['error', 'as-needed'],
  'block-spacing': ['error', 'always'],
  'space-in-parens': ['off', 'never'], // conflict with other formatter
  'spaced-comment': ['error', 'always'],
  'dot-location': ['error', 'property'],
  'no-cond-assign': ['error', 'always'],
  'no-template-curly-in-string': 'error',
  'object-shorthand': ['error', 'always'],
  'arrow-body-style': ['error', 'as-needed'],
  'space-before-blocks': ['error', 'always'],
  'object-curly-spacing': ['error', 'always'],
  'array-bracket-spacing': ['error', 'never'],
  'computed-property-spacing': ['error', 'never'],
  'no-param-reassign': ['error', { props: false }],
  // 'camelcase': ['warn', { properties: 'always' }],
  'no-multiple-empty-lines': ['error', { max: 1 }],
  'max-lines-per-function': ['error', { max: 100 }],
  quotes: ['error', 'single', { avoidEscape: true }],
  // Allow [a,b,x,y,z] for javascript array operations and geometry
  'id-length': ['error', { exceptionPatterns: ['[^A-Zc-w]'] }],
  'one-var': [
    'error',
    {
      uninitialized: 'never',
      initialized: 'never'
    }
  ],
  'brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true
    }
  ],
  'no-constant-condition': [
    'error',
    {
      checkLoops: false
    }
  ],
  'max-statements-per-line': [
    'warn',
    {
      max: 2
    }
  ],
  'operator-linebreak': [
    'error',
    'after',
    {
      overrides: { '?': 'before', ':': 'before' }
    }
  ],
  'prefer-arrow-callback': [
    'error',
    {
      allowUnboundThis: false
    }
  ],
  'prefer-destructuring': [
    'error',
    {
      VariableDeclarator: {
        array: true,
        object: true
      },
      AssignmentExpression: {
        array: true,
        object: true
      }
    },
    {
      enforceForRenamedProperties: false
    }
  ],
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: true,
      properties: true,
      capIsNewExceptions: ['Router'],
      newIsCapExceptions: []
    }
  ],
  'max-len': [
    'error',
    {
      code: 120,
      comments: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
      ignoreTrailingComments: true,
      ignoreTemplateLiterals: true
    }
  ],
  'space-unary-ops': [
    'error',
    {
      words: true,
      nonwords: false
    }
  ],
  'key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true
    }
  ],
  'semi-spacing': [
    'error',
    {
      before: false,
      after: true
    }
  ],
  'arrow-spacing': [
    'error',
    {
      before: true,
      after: true
    }
  ],
  'keyword-spacing': [
    'error',
    {
      overrides: {
        catch: {
          after: true // clashes with other formatter
        }
      }
    }
  ],
  'generator-star-spacing': [
    'error',
    {
      before: false,
      after: true,
      method: { before: true, after: false } // clashes with other formatter
    }
  ],
  'no-unused-vars': [
    'off', // using unused-imports/no-unused-vars
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }
  ],
  'no-unused-expressions': [
    'error',
    {
      allowTernary: true,
      enforceForJSX: true,
      allowShortCircuit: true,
      allowTaggedTemplates: true
    }
  ]
  // 'space-before-function-paren': [
  //   'error',
  //   {
  //     named: 'never', // clashes with other formatter
  //     anonymous: 'never',
  //     asyncArrow: 'always'
  //   }
  // ],
  // 'capitalized-comments': [
  //   'error',
  //   'never',
  //   {
  //     ignoreInlineComments: true,
  //     ignoreConsecutiveComments: true
  //   }
  // ],
};

module.exports = { baseRules };
