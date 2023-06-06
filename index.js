// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier",
    "standard",
    "plugin:unicorn/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  plugins: ["@typescript-eslint"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: { extensions: [".js", ".mjs", ".cjs"] },
      typescript: {},
    },
  },
  rules: {
    // Disable formatting rules
    semi: 0,
    quotes: 0,
    indent: 0,
    "space-before-function-paren": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "keyword-spacing": 0,
    "no-multiple-empty-lines": 0,
    "no-trailing-spaces": 0,
    "unicorn/number-literal-case": 0,
    "unicorn/template-indent": 0,
    "generator-star-spacing": 0,
    "space-infix-ops": 0,
    "comma-spacing": 0,
    "brace-style": 0,
    "space-in-parens": 0,
    "space-before-blocks": 0,
    "semi-spacing": 0,
    "object-property-newline": 0,
    "no-multi-spaces": 0,
    "key-spacing": 0,
    "eol-last": 0,
    "func-call-spacing": 0,
    "comma-style": 0,

    // Disable some unnecessary or conflicting rules
    "no-use-before-define": "off",
    "unicorn/prevent-abbreviations": 0,
    "unicorn/no-await-expression-member": 0,
    "unicorn/no-useless-undefined": 0,
    "unicorn/no-array-push-push": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "unicorn/prefer-string-replace-all": 0,

    // Enforce import order
    "import/order": "error",

    // Imports should come first
    "import/first": "error",

    // Other import rules
    "import/no-mutable-exports": "error",

    // Allow unresolved imports
    "import/no-unresolved": "off",

    // Prefer const over let
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
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
    "no-useless-rename": "error",
  },
};
