module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': ['error', { code: 80 }],
    'comma-dangle': ["error", "only-multiline"],
    "semi": ["error", "always"]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  
}
