import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'
import stylistic from '@stylistic/eslint-plugin'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  stylistic.configs.recommended,
  { ignores: ['factory/test-project/**/*.js'] },
  {
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
    },
  },
]
