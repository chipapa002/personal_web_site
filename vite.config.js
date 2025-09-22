import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'globe': ['react-globe.gl']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react-globe.gl']
  }
})