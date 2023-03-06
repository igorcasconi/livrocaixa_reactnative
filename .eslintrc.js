module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react-hooks', '@typescript-eslint'],
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'comma-dangle': [2, 'never'],
    'react/display-name': 0,
    'no-trailing-spaces': [2],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-boolean-value': [0],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 2,
    'space-before-function-paren': 0,
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'react/no-unescaped-entities': 'off'
  }
}
