/**
 * Módulo de Analytics & Tracking desacoplado para Dirhect
 * Dispara eventos para Google Analytics 4 (GA4), Google Tag Manager (GTM) e Meta Pixel
 * de forma segura, garantindo que não haja erros caso as tags ainda não estejam injetadas.
 */

export const trackEvent = (eventName, params = {}) => {
  try {
    // 1. Google Tag Manager (dataLayer)
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params,
        event_time: new Date().toISOString()
      })
    }

    // 2. Google Analytics 4 (gtag)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params)
    }

    // 3. Meta Pixel (fbq)
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (eventName === 'generate_lead') {
        window.fbq('track', 'Lead', {
          content_name: params.form_name || 'Demonstração',
          currency: 'BRL',
          value: params.value || 0
        })
      } else if (eventName === 'click_demo') {
        window.fbq('trackCustom', 'ClickDemo', params)
      } else if (eventName === 'click_whatsapp') {
        window.fbq('trackCustom', 'ClickWhatsApp', params)
      }
    }

    if (import.meta.env.DEV) {
      console.log(`[Dirhect Analytics] Event: ${eventName}`, params)
    }
  } catch (err) {
    console.warn('[Dirhect Analytics Error]', err)
  }
}

/**
 * Disparado estritamente após a confirmação de envio bem-sucedido de um formulário de lead.
 */
export const trackLead = ({ formName, leadType = 'demo', additionalData = {} }) => {
  trackEvent('generate_lead', {
    form_name: formName,
    lead_type: leadType,
    ...additionalData
  })
}

/**
 * Disparado quando o usuário começa a preencher o formulário (no primeiro input/focus).
 */
export const trackFormStart = ({ formName }) => {
  trackEvent('form_start', {
    form_name: formName
  })
}

/**
 * Disparado ao submeter o formulário (antes da resposta do backend).
 */
export const trackFormSubmit = ({ formName }) => {
  trackEvent('form_submit', {
    form_name: formName
  })
}

/**
 * Disparado ao clicar em botões comerciais de "Agendar Demonstração" ou "Solicitar Demonstração".
 */
export const trackDemoClick = ({ location = 'header', label = 'Solicitar demonstração' }) => {
  trackEvent('click_demo', {
    click_location: location,
    button_label: label
  })
}

/**
 * Disparado ao clicar em contatos/links diretos de WhatsApp.
 */
export const trackWhatsAppClick = ({ location = 'footer' } = {}) => {
  trackEvent('click_whatsapp', {
    click_location: location
  })
}

export default {
  trackEvent,
  trackLead,
  trackFormStart,
  trackFormSubmit,
  trackDemoClick,
  trackWhatsAppClick
}
