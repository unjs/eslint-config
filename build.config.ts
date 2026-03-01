import { defineBuildConfig } from "obuild/config";
import { writeFile, rm, readFile } from "node:fs/promises";
import { x } from "tinyexec";
import { format } from 'oxfmt'

export default defineBuildConfig({
  entries: ["src/eslint.config.ts"],
  hooks: {
    async start() {
      const unjsPreset = await import("./src/eslint.config.ts").then(
        (m) => m.default,
      );
      const { flatConfigsToRulesDTS } = await import("eslint-typegen/core");
      const dts = await flatConfigsToRulesDTS(unjsPreset(), {
        includeAugmentation: false,
      });
      await writeFile("src/types.gen.d.ts", dts);
      console.log("Generated src/types.gen.d.ts");
    },
    async end() {
      const occConfig = ".oxlintrc.json"
      await rm(occConfig, { force: true });
      await x("node", ["node_modules/@oxlint/migrate/dist/bin/oxlint-migrate.mjs"])
      const config = JSON.parse(await readFile(occConfig, "utf8"));
      delete config.$schema;
      delete config.globals;
      const json = (await format(occConfig, JSON.stringify(config, null, 2))).code
      await writeFile(occConfig, json);
      console.log(`Generated ${occConfig}`);
    }
  },
});
