# `eslint-config-unjs`

Sharable ESLint config preset for usage across unjs repositories.

✅ Includes:

- [eslint recommended rules](https://eslint.org/docs/latest/rules/)
- [uniciorn rules ](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [typescript-eslint integration](https://typescript-eslint.io/)
- [markdown plugin](https://www.npmjs.com/package/eslint-plugin-markdown)

## Getting started

> [!NOTE]
> This preset uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

Install dependencies:

```sh
npx nypm install -D eslint typescript eslint-config-unjs
```

Create `eslint.config.mjs` in your project root:

```js
import unjs from "eslint-config-unjs";

export default unjs({ ignores: [] }, { rules: {} });
```

**Tips:**

- You can pass any number of flat configs to unjs preset wrapper
- Types for `rules` are auto generated using [`antfu/eslint-typegen`](https://github.com/antfu/eslint-typegen).

## License

MIT
