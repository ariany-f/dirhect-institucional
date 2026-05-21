// Configuração WordPress - Endpoints para envio de emails
const WORDPRESS_CONFIG = {
  baseUrl: import.meta.env.VITE_WORDPRESS_URL || 'https://wp-api.dirhect.com.br',
  endpoints: {
    demo: '/wp-json/dirhect/v1/send-demo',
    support: '/wp-json/dirhect/v1/send-support',
    indication: '/wp-json/dirhect/v1/send-indication',
    partnership: '/wp-json/dirhect/v1/send-partnership'
  }
}

console.log('WordPress Config:', WORDPRESS_CONFIG)

// Função para enviar email via WordPress
const sendWordPressEmail = async (formData, type) => {
  try {
    const endpoint = WORDPRESS_CONFIG.endpoints[type]
    const url = WORDPRESS_CONFIG.baseUrl + endpoint

    console.log('Enviando email via WordPress:', {
      url,
      type,
      formData
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    let result = {}
    try {
      result = await response.json()
    } catch {
      result = {}
    }

    if (response.ok && result.success) {
      console.log('Email enviado com sucesso via WordPress:', {
        type,
        result
      })
      return {
        success: true,
        message: result.message || 'Email enviado com sucesso!',
        isLocal: false,
        result
      }
    }

    const errorMessage =
      result?.message ||
      result?.data?.message ||
      (typeof result?.error === 'string' ? result.error : null) ||
      `Erro ao enviar email (${response.status})`
    throw new Error(errorMessage)

  } catch (error) {
    console.error('Erro ao enviar email via WordPress:', error)
    return {
      success: false,
      message: error.message || 'Erro ao enviar email',
      isLocal: true,
      error
    }
  }
}



// Função para enviar email de demonstração
export const sendDemoEmail = async (formData) => {
  return await sendWordPressEmail(formData, 'demo')
}

// Função para enviar email de suporte
export const sendSupportEmail = async (formData) => {
  return await sendWordPressEmail(formData, 'support')
}

// Função para enviar email de indicação
export const sendIndicationEmail = async (formData) => {
  return await sendWordPressEmail(formData, 'indication')
}

// Função para enviar solicitação de parceria (página Parceiros)
export const sendPartnershipEmail = async (formData) => {
  return await sendWordPressEmail(formData, 'partnership')
}

export default {
  sendDemoEmail,
  sendSupportEmail,
  sendIndicationEmail,
  sendPartnershipEmail
} 