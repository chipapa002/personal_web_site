import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression' // Brotli compression

export default defineConfig({
  plugins: [
    react({
      // ensure proper JSX handling for React 17+ (automatic runtime)
      jsxRuntime: 'automatic'
    }),
    compression({ algorithm: 'brotliCompress' })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep Three.js + React-Three packages in their own chunk
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-core'
            }
            // everything else in vendor
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1024
  },
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'react-globe.gl'
    ]
    // ✅ removed the conflicting exclude
  }
})
