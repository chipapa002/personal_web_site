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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate React and React-DOM into their own chunk
            if (id.includes('react') && !id.includes('@react-three')) {
              return 'react-vendor'
            }
            // Keep Three.js + React-Three packages together
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-core'
            }
            // GSAP in its own chunk
            if (id.includes('gsap')) {
              return 'gsap'
            }
            // Everything else in vendor
            return 'vendor'
          }
        }
      }
    },
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