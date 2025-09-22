import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    }),
    compression({ algorithm: 'brotliCompress' })
  ],
  build: {
    chunkSizeWarningLimit: 1024,
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'react-globe.gl'
    ]
  },
  define: {
    global: 'globalThis'
  }
})