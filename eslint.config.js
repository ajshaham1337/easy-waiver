import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,                 // plain-JS rules
  ...tseslint.configs.recommended,        // TS rules

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      'eol-last': ['error', 'always'],    // newline at EOF
    },
  },
];
