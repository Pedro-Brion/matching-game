import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import extractorSvelte from '@unocss/extractor-svelte'
import { defineConfig } from 'unocss'

export default defineConfig({
  extractors: [
    extractorSvelte(),
  ],
  shortcuts: [
    { logo: 'i-logos-svelte-icon w-6em h-6em transform transition-800 hover:rotate-180' },
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme:{
    colors: {
     darkin: '#8080bb'
    }
  },
})