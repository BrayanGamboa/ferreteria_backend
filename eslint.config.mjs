import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': ['error', { allow: ['error'] }],
      'no-trailing-spaces': 'warn',
      semi: 'error',
      'comma-dangle': 'error',
      strict: 'error',
      'require-await': 'error'
    }
  }
];
