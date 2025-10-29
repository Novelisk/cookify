import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect', // Detecta React 17+
      },
    },
    rules: {
      // 🚀 Reglas esenciales para React + Hooks
      ...reactPlugin.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off', // React 17+ no necesita import
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off', // Desactiva PropTypes si no los usas
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    ignores: ['dist/**', 'node_modules/**'],
  },
];
