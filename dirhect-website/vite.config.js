import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Em dev, espelha o .htaccess: GET /parceiro → conteúdo de parceiro-template.html */
function parceiroDevRoute() {
  return {
    name: 'parceiro-dev-route',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0]
        if (pathname !== '/parceiro' && pathname !== '/parceiro/') {
          next()
          return
        }
        const file = path.join(server.config.publicDir, 'parceiro-template.html')
        if (!fs.existsSync(file)) {
          next()
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync(file))
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
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
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
