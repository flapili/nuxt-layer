import { defineConfig, presetUno, transformerVariantGroup } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno({}),
    presetScrollbar({}),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
