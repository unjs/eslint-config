import jiti from "jiti";

/** @type import("./src/eslint.config") */
const unjs = jiti(import.meta.url)("./src/eslint.config.ts");

export default unjs.default(
  { ignores: ["**/types.gen.d.ts"] },
  { rules: {} }
);
