import { useEffect, useState } from 'react'

/** Bump ao alterar `public/parceiro-template.html` para forçar novo pedido (query string). */
const PARTNER_TEMPLATE_VERSION = 'partner-page-r142-link-5191'

function partnerTemplateUrl() {
  const base = import.meta.env.BASE_URL || '/'
  const path = `${base}parceiro-template.html`.replace(/\/{2,}/g, '/')
  return `${path}?v=${encodeURIComponent(PARTNER_TEMPLATE_VERSION)}`
}

/** URL absoluta do template (iframe com `src` evita bugs de atualização com `srcDoc`). */
function resolveTemplateHref(pathAndQuery) {
  if (typeof window === 'undefined') return pathAndQuery
  try {
    return new URL(pathAndQuery, window.location.href).href
  } catch {
    return pathAndQuery
  }
}

const ParceiroSubdominio = () => {
  const [iframeSrc, setIframeSrc] = useState('')

  useEffect(() => {
    const bust = import.meta.env.DEV ? `&_dev=${Date.now()}` : ''
    setIframeSrc(resolveTemplateHref(`${partnerTemplateUrl()}${bust}`))
  }, [PARTNER_TEMPLATE_VERSION])

  if (!iframeSrc) {
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

  return (
    <iframe
      key={iframeSrc}
      title="Programa de Parceiros Dirhect"
      src={iframeSrc}
      style={{
        border: 'none',
        width: '100%',
        minHeight: '100vh',
        display: 'block',
        background: '#fff',
      }}
    />
  )
}

export default ParceiroSubdominio
