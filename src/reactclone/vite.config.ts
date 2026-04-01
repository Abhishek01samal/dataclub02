import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:math'; @use 'sass:map'; @use "@/styles/_import" as *;`,
      },
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
})
