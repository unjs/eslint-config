import {defineBuildConfig } from 'unbuild'
import fs from "node:fs/promises"

export default defineBuildConfig({
 hooks: {
  async  "build:before"() {
    const unjsPreset = await import('./src/eslint.config').then(m => m.default)
    const { flatConfigsToRulesDTS } = await import('eslint-typegen/core')
    const dts = await flatConfigsToRulesDTS(unjsPreset(), {
      includeAugmentation: false,
    })
    await fs.writeFile('src/types.gen.d.ts', dts)
  }
 }
})
