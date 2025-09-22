import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression' // For Brotli compression

export default defineConfig({
  plugins: [react(), compression({ algorithm: 'brotliCompress' })], // Enable Brotli compression
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three")) {
              return "three-core"; // Separate Three.js and R3F
            }
            if (id.includes("react-globe.gl")) {
              return "globe"; // Separate globe rendering
            }
            return "vendor"; // General third-party packages
          }
        }
      }
    },
    chunkSizeWarningLimit: 1024, // Adjust limit
  },
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "react-globe.gl"
    ],
    exclude: ["react-globe.gl"], // Avoid pre-bundling it
  }
});
