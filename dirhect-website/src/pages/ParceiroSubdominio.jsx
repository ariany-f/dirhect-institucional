import { useEffect } from 'react'

/**
 * Só é montado em navegação client-side (React Router), quando o SPA já está aberto.
 * Em GET /parceiro o servidor entrega o template direto (.htaccess ou middleware do Vite).
 * Aqui forçamos um reload em /parceiro para o servidor aplicar o mesmo rewrite.
 */
const ParceiroSubdominio = () => {
  useEffect(() => {
    const url = new URL('/parceiro', window.location.origin)
    if (import.meta.env.DEV) {
      url.searchParams.set('_dev', String(Date.now()))
    }
    window.location.replace(url.href)
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#4a5568',
        background: '#fff',
      }}
    >
      A carregar…
    </div>
  )
}

export default ParceiroSubdominio
