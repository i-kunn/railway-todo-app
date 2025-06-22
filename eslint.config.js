import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      js,
      react: pluginReact, // ✅ オブジェクト形式で書くのがFlat Configの正解
    },
    settings: {
      react: {
        version: 'detect', // ✅ ここが警告解消のために必要
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // ✅ 推奨ルールだけ抽出してマージ
      'react/react-in-jsx-scope': 'off', // ✅ React 17+で不要
    },
    extends: [
      'js/recommended', // JS標準ルール
      prettier, // Prettier競合防止
    ],
  },
]);
