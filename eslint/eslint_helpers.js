const { readFileSync } = require('node:fs');

const jsExtensions = ['.js', '.jsx', '.json'];
const tsExtensions = ['.ts', '.tsx', '.tson', '.d.ts'];
const tryExtensions = ['.ts', '.tsx', '.tson', '.js', '.jsx', '.json', '.mjs', '.node', '.d.ts'];

/** @type {string[]} */
const extraneousModules = ['@oclif/core'];

/** @type {string[]} */
const unpublishedModules = [];

/** @type {string[]} */
const ignorePatterns = readFileSync(`${__dirname}/.eslintignore`, 'utf8')
  .split('\n')
  .filter((pattern) => pattern.trim().length > 0 && !pattern.startsWith('#'));

module.exports = {
  jsExtensions,
  tsExtensions,
  tryExtensions,
  ignorePatterns,
  extraneousModules,
  unpublishedModules
};
