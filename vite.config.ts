import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [visualizer({ open: true })],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
