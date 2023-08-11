module.exports = {
  extends: [
    '@react-native',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prefer-const': ['warn'],
    'prettier/prettier': ['warn'],
    quotes: ['warn', 'single'],
    'react-hooks/exhaustive-deps': ['warn'],
    'react-hooks/rules-of-hooks': ['warn'],
    'react/jsx-sort-props': [
      'warn',
      {
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: ['key'],
      },
    ],
    semi: ['error', 'always'],
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys': [
      'warn',
      'asc',
      {caseSensitive: true, minKeys: 2, natural: false},
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
};
