import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginJest from "eslint-plugin-jest";
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'plugin:react/recommended', 'next', 'prettier'],
  }),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/**/*.{js,ts,jsx,tsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      'react/prop-types': 'off',
      ...pluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        },
      ],
      // import manager
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'max-len': ['error', { code: 120, tabWidth: 2, ignoreComments: true }],
    },
  },
  // Jest Configuration
  {
    files: ["**/__tests__/**/*.?(c|m)[jt]s?(x)", "**/*.test.?(c|m)[jt]s?(x)", "**/*.spec.?(c|m)[jt]s?(x)"],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        "describe": "readonly",
        "test": "readonly",
        "expect": "readonly",
        "beforeEach": "readonly",
        "afterEach": "readonly",
        "beforeAll": "readonly",
        "afterAll": "readonly",
        "jest": "readonly",
        "it": "readonly",
        ...globals.browser,
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
];

export default config;
