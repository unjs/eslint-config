// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "standard",
    "plugin:unicorn/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  plugins: ["@typescript-eslint"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: { extensions: [".js", ".mjs", ".cjs"] },
      typescript: {}
    }
  },
  rules: {
    // Prettier defaults compatibility
    quotes: ["error", "double"],
    semi: ["error", "always"],

    // Enforce import order
    "import/order": "error",

    // Imports should come first
    "import/first": "error",

    // Other import rules
    "import/no-mutable-exports": "error",

    // Allow unresolved imports
    "import/no-unresolved": "off",

    // Allow paren-less arrow functions only when there's no braces
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],

    // Prefer const over let
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],

    // No single if in an "else" block
    "no-lonely-if": "error",

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: ["error", "all"],

    // No async function without await
    "require-await": "error",

    // Force dot notation when possible
    "dot-notation": "error",

    // Force object shorthand where possible
    "object-shorthand": "error",

    // No useless destructuring/importing/exporting renames
    "no-useless-rename": "error"
  }
};
