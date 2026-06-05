import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    /** true expõe 127.0.0.1 e localhost no terminal; evita confusão com porta antiga (5173). */
    host: true,
    port: 5191,
    strictPort: true,
    allowedHosts: ['parceiro.localhost', 'localhost', '127.0.0.1', 'parceiro.127.0.0.1'],
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
