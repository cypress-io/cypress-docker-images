import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  globalIgnores(['factory/test-project/**/*.js']),
  {
    files: ['**/*.{,m}js'],
    extends: [
      js.configs.recommended,
      pluginCypress.configs.recommended,
      stylistic.configs.recommended,
    ],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
    },
    languageOptions: {
      globals: globals.node,
    },
  },
])
