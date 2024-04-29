import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// @ts-ignore
import eslintPluginUnicorn from "eslint-plugin-unicorn";
// @ts-ignore
import markdown from "eslint-plugin-markdown";
import type { Linter } from "eslint";
import type { RuleOptions } from "./types.gen";
import globals from "globals";

export interface MainConfig {
  rules?: RuleOptions;
  markdown?: false | { rules: RuleOptions };
  ignores?: string[];
}

export interface TypedFlatConfig extends Omit<Linter.FlatConfig, "rules"> {
  rules?: RuleOptions;
}

export default function unjsPreset(
  config: MainConfig = {},
  ...userConfigs: TypedFlatConfig[]
): Linter.FlatConfig[] {
  const rules: RuleOptions = {
    "unicorn/number-literal-case": 0,
    "unicorn/template-indent": 0,
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
    "unicorn/no-abusive-eslint-disable": 0,
    "unicorn/import-style": 0,
    "unicorn/prefer-module": 0,
    "unicorn/consistent-function-scoping": 0,
    ...config.rules,
  };

  const configs: Linter.FlatConfig[] = [
    // https://eslint.org/docs/latest/rules/
    eslint.configs.recommended,
    // https://typescript-eslint.io/
    ...(tseslint.configs.recommended as Linter.FlatConfig[]),
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    eslintPluginUnicorn.configs["flat/recommended"] as Linter.FlatConfig,
    // https://www.npmjs.com/package/eslint-plugin-markdown
    config.markdown !== false && { plugins: { markdown } },
    config.markdown !== false && {
      files: ["*.md"],
      processor: "markdown/markdown",
    },
    config.markdown !== false && {
      files: ["**/*.md/*.js", "**/*.md/*.ts"],
      rules: (<RuleOptions>{
        "unicorn/filename-case": 0,
        "no-undef": 0,
        "no-unused-expressions": 0,
        "padded-blocks": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "no-empty-pattern": 0,
        ...config.markdown?.rules,
      }) as any,
    },
    // Preset overrides
    { rules: rules as Linter.RulesRecord },
    {
      languageOptions: {
        globals: Object.fromEntries(
          Object.keys(globals).flatMap((group) =>
            Object.keys(globals[group as keyof typeof globals]).map((k) => [
              k,
              true,
            ]),
          ),
        ),
      },
    },
    { ignores: ["dist", "coverage", ...(config.ignores || [])] },
    // User overrides
    ...(userConfigs as Linter.FlatConfig[]),
  ].filter(Boolean) as Linter.FlatConfig[];

  return configs;
}
