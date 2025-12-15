import { URL, fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Only include devtools in development
    ...(process.env.NODE_ENV !== 'production' ? [devtools()] : []),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // Ensure devtools are excluded in production
    'import.meta.env.PROD': JSON.stringify(
      process.env.NODE_ENV === 'production',
    ),
  },
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    target: 'esnext',
    modulePreload: {
      polyfill: false,
    },
  },
  optimizeDeps: {
    include: ['antd', 'react', 'react-dom'],
    exclude: ['@tanstack/react-devtools', '@tanstack/react-router-devtools'],
  },
})
