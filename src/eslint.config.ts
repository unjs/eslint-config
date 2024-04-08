// @ts-ignore
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import type { Linter } from 'eslint';
import type { RuleOptions } from './types.gen'

export interface PresetOptions {
  rules?: RuleOptions
}

export default function unjsPreset(customConfig: PresetOptions = {}): Linter.FlatConfig[] {
  /** @type RuleOptions */
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
    ...customConfig.rules
  }

  const configs: Linter.FlatConfig[] = [
    eslint.configs.recommended,
    ...tseslint.configs.recommended as Linter.FlatConfig[],
    eslintPluginUnicorn.configs['flat/recommended'] as Linter.FlatConfig,
    { rules: rules as Linter.RulesRecord }
  ];

  return configs
}
