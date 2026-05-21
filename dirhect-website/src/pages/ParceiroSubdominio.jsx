import { useEffect, useState } from 'react'
import './ParceiroSubdominio.css'

/** Bump ao alterar `public/parceiro-template.html` (cache bust na query string). */
const PARTNER_TEMPLATE_VERSION = 'partnership-form-api-5211'

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

/** /parceiro no SPA: Header do site + iframe do template (dev e produção). */
const ParceiroSubdominio = () => {
  const [iframeSrc, setIframeSrc] = useState('')

  useEffect(() => {
    const apiBase = encodeURIComponent(
      import.meta.env.VITE_WORDPRESS_URL || 'https://wp-api.dirhect.com.br'
    )
    const bust = import.meta.env.DEV ? `&_dev=${Date.now()}` : ''
    setIframeSrc(resolveTemplateHref(`${partnerTemplateUrl()}&api=${apiBase}${bust}`))
  }, [])

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
