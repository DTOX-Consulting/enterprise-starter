/** @type import('@Root/typedoc.cjs').TypeDocOptions */
module.exports = {
  out: 'docs',
  name: 'Enterprise Starter',
  entryPoints: ['src'],
  themeColor: '#cb9820',
  excludePrivate: true,
  excludeExternals: true,
  entryPointStrategy: 'expand',
  plugin: ['typedoc-material-theme'],
  exclude: ['**/node_modules/**', '**/__tests__/**', '.next/**']
};
