import unjs from "./src/eslint.config.ts";

export default unjs({ ignores: ["**/types.gen.d.ts"] }, { rules: {} });
