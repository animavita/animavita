module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    jest: true
  },
  extends: ['airbnb', 'plugin:react-native/all'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'react-native', 'jsx-a11y', 'import', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx'] }
    ],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-one-expression-per-line': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react-native/no-color-literals': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-raw-text': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'global-require': 'off',
    'import/no-cycle': 'off',
    'comma-dangle': ['error', { functions: 'ignore' }]
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': { rootPathSuffix: 'src' }
    }
  }
};
