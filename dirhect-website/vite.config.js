import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Em dev, espelha o .htaccess: GET /parceiro → parceiro-template.html (URL permanece /parceiro). */
function parceiroDevRoute() {
  return {
    name: 'parceiro-dev-route',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const pathname = (req.url ?? '').split('?')[0]
        if (pathname === '/parceiro' || pathname === '/parceiro/') {
          const qs = (req.url ?? '').includes('?') ? '?' + req.url.split('?').slice(1).join('?') : ''
          req.url = `/parceiro-template.html${qs}`
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [parceiroDevRoute(), react()],
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
