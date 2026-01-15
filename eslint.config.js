import pluginVue from 'eslint-plugin-vue';

export default [
  { ignores: ['node_modules', 'dist'] },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-debugger': 'off',
    },
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
