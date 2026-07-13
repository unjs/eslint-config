import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import markdown from "@eslint/markdown";
import { version as typescriptVersion } from "typescript";
import type { Linter } from "eslint";
import type { RuleOptions } from "./types.gen.ts";
import globals from "globals";

// typescript-eslint does not support TypeScript 7 yet: https://github.com/typescript-eslint/typescript-eslint/issues/12518
const isTypeScriptEslintSupported =
  Number(typescriptVersion.split(".", 1)[0]) < 7;

if (!isTypeScriptEslintSupported) {
  console.warn(
    `[eslint-config-unjs] TypeScript ${typescriptVersion} is not supported by typescript-eslint yet. Disabling the typescript-eslint preset.`,
  );
}

const typeScriptEslintRules: RuleOptions = isTypeScriptEslintSupported
  ? {
      "@typescript-eslint/ban-ts-comment": 0,
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-var-requires": 0,
    }
  : {};

const typeScriptEslintMarkdownRules: RuleOptions = isTypeScriptEslintSupported
  ? {
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-require-imports": 0,
      "@typescript-eslint/no-unused-expressions": 0,
    }
  : {};

export interface MainConfig {
  rules?: RuleOptions;
  markdown?: false | { rules: RuleOptions };
  ignores?: string[];
}

export interface TypedFlatConfig extends Omit<Linter.Config, "rules"> {
  rules?: RuleOptions;
}

export default function unjsPreset(
  config: MainConfig = {},
  ...userConfigs: TypedFlatConfig[]
): Linter.Config[] {
  const rules: RuleOptions = {
    ...typeScriptEslintRules,

    "unicorn/consistent-function-scoping": 0,
    "unicorn/filename-case": 0,
    "unicorn/import-style": 0,
    "unicorn/no-abusive-eslint-disable": 0,
    "unicorn/no-anonymous-default-export": 0,
    "unicorn/no-array-push-push": 0,
    "unicorn/no-array-sort": 0,
    "unicorn/no-array-reverse": 0,
    "unicorn/no-await-expression-member": 0,
    "unicorn/no-immediate-mutation": 0,
    "unicorn/no-null": 0,
    "unicorn/no-useless-undefined": 0,
    "unicorn/number-literal-case": 0,
    "unicorn/prefer-code-point": 0,
    "unicorn/prefer-module": 0,
    "unicorn/prefer-single-call": 0,
    "unicorn/prefer-string-raw": 0,
    "unicorn/prefer-string-replace-all": 0,
    "unicorn/prefer-ternary": 0,
    "unicorn/prevent-abbreviations": 0,
    "unicorn/template-indent": 0,

    ...config.rules,
  };

  const configs: Linter.Config[] = [
    // https://eslint.org/docs/latest/rules/
    eslint.configs.recommended,
    // https://typescript-eslint.io/
    ...(isTypeScriptEslintSupported
      ? (tseslint.configs.recommended as Linter.Config[])
      : []),
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    eslintPluginUnicorn.configs.recommended as Linter.Config,

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

    // Markdown
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
        "no-empty-pattern": 0,
        "no-redeclare": 0,
        "no-import-assign": 0,
        ...typeScriptEslintMarkdownRules,
        ...config.markdown?.rules,
      }) as any,
    },

    // User overrides
    ...(userConfigs as Linter.Config[]),
  ].filter(Boolean) as Linter.Config[];

  return configs;
}
