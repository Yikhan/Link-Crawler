import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        // 同时打包 main.js 和 crawler.js 到 dist-electron
        entry: ['electron/main.js', 'electron/crawler.js'],
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.js'),
      },
      renderer:
        process.env.NODE_ENV === 'test'
          ? undefined
          : {},
    }),
  ],
  build: {
    // 这里不用 external，避免依赖缺失
  },
})
