import { useEffect } from 'react'

const DEFAULT_TITLE = 'Software de Automação e Integração para RH | Dirhect'
const DEFAULT_DESCRIPTION = 'Automatize processos de RH, admissão digital, gestão de benefícios e tarefas integrando tudo ao seu ERP atual com a plataforma inteligente do Dirhect.'
const DEFAULT_IMAGE = 'https://dirhect.com.br/images/dirhect_og_share.png'
const BASE_URL = 'https://dirhect.com.br'

const updateOrCreateMeta = (selector, attributeName, attributeValue, content) => {
  if (!content) return
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

const updateOrCreateLink = (rel, href) => {
  if (!href) return
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  noindex = false,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title

    // 2. Meta description
    updateOrCreateMeta('meta[name="description"]', 'name', 'description', description)

    // 3. Robots
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow'
    updateOrCreateMeta('meta[name="robots"]', 'name', 'robots', robotsContent)

    // 4. Canonical
    const fullCanonical = canonical
      ? (canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
      : BASE_URL
    updateOrCreateLink('canonical', fullCanonical)

    // 5. Open Graph
    updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title)
    updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description)
    updateOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', ogType)
    updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonical)
    updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    updateOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Dirhect')

    // 6. Twitter
    updateOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    updateOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    updateOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    updateOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    // 7. Structured Data (JSON-LD)
    const existingScript = document.getElementById('dirhect-dynamic-jsonld')
    if (existingScript) {
      existingScript.remove()
    }

    if (schema) {
      const script = document.createElement('script')
      script.id = 'dirhect-dynamic-jsonld'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    return () => {
      const dynamicScript = document.getElementById('dirhect-dynamic-jsonld')
      if (dynamicScript) {
        dynamicScript.remove()
      }
    }
  }, [title, description, canonical, noindex, ogType, ogImage, schema])

  return null
}

export default SEO
