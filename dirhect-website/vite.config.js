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
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    historyApiFallback: true,
    /** 127.0.0.1 evita falhas ao enumerar interfaces (ex.: alguns VPNs / ambientes restritos). */
    host: '127.0.0.1',
    port: 5191,
    /** Se 5191 estiver ocupada, o Vite usa a seguinte e mostra o URL no terminal. */
    strictPort: false,
    allowedHosts: ['parceiro.localhost', 'localhost', '127.0.0.1', 'parceiro.127.0.0.1'],
    headers: {
      'Cache-Control': 'no-store',
    },
  },
})
