// @ts-ignore
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import type { Linter } from "eslint";
import type { RuleOptions } from "./types.gen";

export interface CustomConfig extends Omit<Linter.FlatConfig, "rules"> {
  rules?: RuleOptions;
}

export default function unjsPreset(
  ...userConfigs: CustomConfig[]
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
  };

  const configs: Linter.FlatConfig[] = [
    // https://eslint.org/docs/latest/rules/
    eslint.configs.recommended,
    // https://typescript-eslint.io/
    ...(tseslint.configs.recommended as Linter.FlatConfig[]),
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    eslintPluginUnicorn.configs["flat/recommended"] as Linter.FlatConfig,
    // Preset overides
    { rules: rules as Linter.RulesRecord },
    { ignores: ["dist", "coverage"] },
    // User overrides
    ...(userConfigs as Linter.FlatConfig[]),
  ];

  return configs;
}
