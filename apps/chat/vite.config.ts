import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { one } from 'one/vite'
import type { UserConfig } from 'vite'

export default {
  plugins: [
    one({
      react: {
        compiler: true, // process.env.NODE_ENV === 'production',
        // scan: true,
      },

      // server: {
      //   host: '0.0.0.0',
      // },

      web: {
        defaultRenderMode: 'spa',
      },
    }),

    tamaguiPlugin({
      optimize: process.env.NODE_ENV === 'production',
      components: ['tamagui'],
      config: './src/tamagui/tamagui.config.ts',
      outputCSS: './src/tamagui/tamagui.css',
    }),
  ],
} satisfies UserConfig
