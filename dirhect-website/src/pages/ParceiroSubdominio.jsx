import { useEffect, useState } from 'react'
import './ParceiroSubdominio.css'

/** Bump ao alterar `public/parceiro-template.html` (cache bust na query string). */
const PARTNER_TEMPLATE_VERSION = 'section-full-bleed-5210'

function partnerTemplateUrl() {
  const base = import.meta.env.BASE_URL || '/'
  const path = `${base}parceiro-template.html`.replace(/\/{2,}/g, '/')
  return `${path}?v=${encodeURIComponent(PARTNER_TEMPLATE_VERSION)}`
}

function resolveTemplateHref(pathAndQuery) {
  if (typeof window === 'undefined') return pathAndQuery
  try {
    return new URL(pathAndQuery, window.location.href).href
  } catch {
    return pathAndQuery
  }
}

/**
 * Dev: iframe do template (sem X-Frame-Options no Vite).
 * Produção + navegação client-side: reload em /parceiro (.htaccess serve o HTML estático).
 */
const ParceiroSubdominio = () => {
  const [iframeSrc, setIframeSrc] = useState('')

  useEffect(() => {
    if (import.meta.env.PROD) {
      window.location.replace(new URL('/parceiro', window.location.origin).href)
      return
    }
    const bust = `&_dev=${Date.now()}`
    setIframeSrc(resolveTemplateHref(`${partnerTemplateUrl()}${bust}`))
  }, [])

  if (import.meta.env.PROD) {
    return <div className="parceiro-page-wrap parceiro-page-loading">A carregar…</div>
  }

  if (!iframeSrc) {
    return <div className="parceiro-page-wrap parceiro-page-loading">A carregar…</div>
  }

  return (
    <div className="parceiro-page-wrap">
      <iframe
        key={iframeSrc}
        title="Programa de Parceiros Dirhect"
        src={iframeSrc}
        className="parceiro-page-iframe"
      />
    </div>
  )
}

export default ParceiroSubdominio
