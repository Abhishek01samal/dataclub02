import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@clone': path.resolve(__dirname, './src/reactclone/src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "sass:math"; @use "sass:map"; @use "@clone/styles/_import" as *;`,
      },
    },
  },
  // Pre-bundle heavy deps so Vite doesn't re-process them on every HMR
  optimizeDeps: {
    include: [
      'gsap',
      'gsap/ScrollTrigger',
      'three',
      'react',
      'react-dom',
      'framer-motion',
      'lenis',
      'ogl',
    ],
  },
  build: {
    // Raise the chunk size warning limit (three.js is large by design)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split heavy libraries into separate chunks for better caching
        // Using function syntax for better compatibility with modern Vite/Rolldown
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('gsap')) return 'vendor-gsap';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('ogl') || id.includes('lenis')) return 'vendor-gl';
            if (id.includes('react')) return 'vendor-react';
            return 'vendor';
          }
        },
      },
    },
    // Enable minification of CSS
    cssMinify: true,
    // Target modern browsers to skip old polyfills
    target: 'esnext',
  },
})
