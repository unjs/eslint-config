# ✅ `eslint-config-unjs`

Sharable ESLint config preset for usage across unjs repositories.

Based on:

- [eslint recommended](https://eslint.org/docs/latest/rules/)
- [typescript-eslint](https://typescript-eslint.io/)
- [eslint-plugin-uniciorn](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Getting started

> [!NOTE]
> This preset uses the new [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files).

Install dependencies:

```sh
npx nypm install -D eslint typescript eslint-config-unjs
```

Create `eslint.config.mjs` in your project root:

```js
import unjs from 'eslint-config-unjs'

export default unjs({
  rules: {}
})
```

## License

MIT
