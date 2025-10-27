import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginNext from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import { FlatCompat } from '@eslint/eslintrc';

// nextjs does not support eslint v9 flat config yet -> this workaround is provided by their doc
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  [
    js.configs.recommended,
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],

    ...compat.config({
      extends: ['next', 'next/core-web-vitals'],
    }),

    // prettier plugin should be after the other ones so it can override their rules
    eslintPluginPrettierRecommended,

    {
      files: ['**/*.{mjs,ts,tsx}'],
      plugins: {
        js,
        react: pluginReact,
        'react-hooks': reactHooks,
        '@next/next': pluginNext,
        'jsx-a11y': jsxA11y,
      },
      extends: ['js/recommended', js.configs.recommended, tseslint.configs.recommended],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          ...globals.browser,
        },
      },
      rules: {
        // Note: you must disable the base rule as it can report incorrect errors
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            destructuredArrayIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/naming-convention': 'off',
        'arrow-body-style': ['error', 'as-needed'],
        'no-console': ['warn', { allow: ['error'] }],
        eqeqeq: 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'max-len': [2, { code: 120, tabWidth: 4, ignoreUrls: true }],
        'prettier/prettier': 'warn',
      },
    },
  ],
  [globalIgnores(['./pages/_error.js'])],
);
