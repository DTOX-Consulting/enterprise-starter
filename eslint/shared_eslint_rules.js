/* eslint-disable regex/invalid */

const sharedRules = {
  'regex/invalid': [
    {
      regex: 'JSON.stringify',
      message: "Prefer using { stringify } from 'safe-stable-stringify' instead of JSON.stringify",
      replacement: 'stringify'
    }
  ],
  '@typescript-eslint/no-restricted-imports': [
    {
      name: 'slonik-sql-tag-raw',
      message: 'Please avoid using raw queries'
    },
    {
      name: 'glob',
      message: 'Please use fast-glob instead of glob.'
    }
  ]
};

module.exports = { sharedRules };
