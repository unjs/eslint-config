// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'standard',
    'plugin:unicorn/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.cjs'] },
      typescript: {}
    }
  },
  rules: {
    // Disable formatting rules
    semi: 0,
    quotes: 0,
    "space-before-function-paren": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "unicorn/prevent-abbreviations": 0,
    "keyword-spacing": 0,
    "no-multiple-empty-lines": 0,
    "no-trailing-spaces": 0,

    // Enforce import order
    'import/order': 'error',

    // Imports should come first
    'import/first': 'error',

    // Other import rules
    'import/no-mutable-exports': 'error',

    // Allow unresolved imports
    'import/no-unresolved': 'off',

    // Prefer const over let
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],

    // No single if in an "else" block
    'no-lonely-if': 'error',

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: ['error', 'all'],

    // No async function without await
    'require-await': 'error',

    // Force dot notation when possible
    'dot-notation': 'error',

    // Force object shorthand where possible
    'object-shorthand': 'error',

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 'error'
  }
}
