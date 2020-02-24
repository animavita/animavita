module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'import', 'relay', 'react-hooks', 'no-only-tests'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:relay/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/named': 'off',
    'no-console': 'error',
    'react/prop-types': 'off',
    'import/first': 'warn',
    'import/namespace': ['error', {allowComputed: true}],
    'import/no-duplicates': 'error',
    'import/order': ['error', {'newlines-between': 'always-and-inside-groups'}],
    'import/no-cycle': 'error',
    'import/no-self-import': 'warn',
    'import/extensions': ['off', 'never', {ts: 'never'}],
    '@typescript-eslint/camelcase': ['off', {ignoreDestructuring: true}],
    'no-only-tests/no-only-tests': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      'eslint-import-resolver-typescript': true,
    },
  },
};
