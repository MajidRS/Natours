import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    },
    plugins: {
      prettier
    },
    rules: {
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^(req|res|next|val)$' }
      ],
      'no-undef': 'error',
      // Debug
      'no-console': 'warn',
      'no-debugger': 'warn',
      // Node.js
      'no-process-exit': 'off',
      // Prettier
      'prettier/prettier': 'error'
    }
  }
]
