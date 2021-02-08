const path = require('path');

/* eslint-disable no-magic-numbers */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', 'jsx-a11y', 'prettier', 'jest', 'jest-dom'],
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'plugin:jest/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        moduleDirectory: ['node_modules', 'src', 'packages', 'server'],
        paths: [path.resolve(__dirname, 'src/')],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.tsx', '.ts'],
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    curly: 1,
    camelcase: [
      0,
      {
        allow: ['^SupportOfferRequest_'],
      },
    ],
    radix: 0,
    'consistent-return': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/no-cycle': 1,
    'no-unused-expressions': 0,
    'no-throw-literal': 0,
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['__typename', '__STORE__'] }],
    'no-plusplus': 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'no-shadow': 'off',
    'no-return-await': 0,
    'no-use-before-define': 'off',
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1],
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: true,
      },
    ],
    'no-irregular-whitespace': [
      'error',
      {
        skipComments: true,
        skipStrings: true,
        skipTemplates: true,
      },
    ],
    'prettier/prettier': [
      2,
      {
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        semi: true,
        printWidth: 120,
        trailingComma: 'all',
        proseWrap: 'never',
      },
    ],
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-undef': 0,
    'react/prop-types': 0,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-array-index-key': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/jsx-pascal-case': 0,
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': [
      1,
      {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          Symbol: {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          Function: {
            message: [
              'The `Function` type accepts any function-like value.',
              'It provides no type safety when calling the function, which can be a common source of bugs.',
              'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
              'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
            ].join('\n'),
          },
          // object typing
          Object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          object: {
            message: [
              'The `object` type is currently hard to use ([see this issue](https://github.com/microsoft/TypeScript/issues/21732)).',
              'Consider using `Record<string, unknown>` instead, as it allows you to more easily inspect and use the keys.',
            ].join('\n'),
          },
        },
        extendDefaults: false,
      },
    ],
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'react/jsx-filename-extension': [
          2,
          {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
          },
        ],
      },
    },
    {
      files: ['*.jsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    {
      files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
