// Serviço de Email usando EmailJS
// Instalar: npm install emailjs-com

import emailjs from 'emailjs-com'

// Configuração EmailJS - Adicione suas credenciais aqui
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  templateId: {
    demo: import.meta.env.VITE_EMAILJS_DEMO_TEMPLATE_ID || 'your_demo_template_id',
    support: import.meta.env.VITE_EMAILJS_SUPPORT_TEMPLATE_ID || 'your_support_template_id',
    confirmation: import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'your_confirmation_template_id'
  },
  userId: import.meta.env.VITE_EMAILJS_USER_ID || 'your_user_id'
}

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.userId)

// Função para enviar email via EmailJS
const sendEmailWithEmailJS = async (templateId, templateParams) => {
  try {
    // Verificar se as configurações estão definidas
    if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId === 'your_service_id') {
      console.warn('Configuração EmailJS não definida. Email não será enviado.')
      return {
        success: false,
        message: 'Configuração EmailJS não definida. Configure as variáveis de ambiente.',
        isLocal: true
      }
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      templateParams
    )

    console.log('Email enviado via EmailJS:', result)
    return {
      success: true,
      message: 'Email enviado com sucesso!',
      isLocal: false
    }

  } catch (error) {
    console.error('Erro ao enviar email via EmailJS:', error)
    return {
      success: false,
      message: error.message || 'Erro ao enviar email',
      isLocal: true
    }
  }
}

// Função para enviar email de demonstração
export const sendDemoEmailWithEmailJS = async (formData) => {
  const templateParams = {
    to_email: import.meta.env.VITE_COMMERCIAL_EMAIL || 'contato@dirhect.com.br',
    to_name: 'Equipe Comercial Dirhect',
    from_name: formData.nomeContato,
    from_email: formData.email,
    empresa: formData.nomeEmpresa,
    cnpj: formData.cnpj,
    segmento: formData.segmento,
    funcionarios: formData.numeroFuncionarios,
    cargo: formData.cargo,
    telefone: formData.telefone,
    necessidades: formData.necessidades.join(', '),
    mensagem: formData.mensagem || 'Nenhuma mensagem adicional',
    data_solicitacao: new Date().toLocaleDateString('pt-BR'),
    hora_solicitacao: new Date().toLocaleTimeString('pt-BR')
  }

  return await sendEmailWithEmailJS(EMAILJS_CONFIG.templateId.demo, templateParams)
}

// Função para enviar email de suporte
export const sendSupportEmailWithEmailJS = async (formData) => {
  const templateParams = {
    to_email: import.meta.env.VITE_SUPPORT_EMAIL || 'contato@dirhect.com.br',
    to_name: 'Equipe de Suporte Dirhect',
    from_name: formData.name,
    from_email: formData.email,
    subject: getSubjectLabel(formData.subject),
    message: formData.message,
    data_solicitacao: new Date().toLocaleDateString('pt-BR'),
    hora_solicitacao: new Date().toLocaleTimeString('pt-BR')
  }

  return await sendEmailWithEmailJS(EMAILJS_CONFIG.templateId.support, templateParams)
}

// Função para enviar confirmação para o cliente
export const sendConfirmationEmailWithEmailJS = async (formData, type) => {
  let templateParams

  if (type === 'demo') {
    templateParams = {
      to_email: formData.email,
      to_name: formData.nomeContato,
      from_name: 'Dirhect',
      from_email: 'contato@dirhect.com.br',
      empresa: formData.nomeEmpresa,
      data_solicitacao: new Date().toLocaleDateString('pt-BR')
    }
  } else {
    templateParams = {
      to_email: formData.email,
      to_name: formData.name,
      from_name: 'Dirhect Suporte',
      from_email: 'contato@dirhect.com.br',
      data_solicitacao: new Date().toLocaleDateString('pt-BR')
    }
  }

  return await sendEmailWithEmailJS(EMAILJS_CONFIG.templateId.confirmation, templateParams)
}

// Função auxiliar para traduzir o assunto
const getSubjectLabel = (subject) => {
  const subjects = {
    'duvida': 'Dúvida sobre funcionalidade',
    'problema': 'Problema técnico',
    'sugestao': 'Sugestão de melhoria',
    'comercial': 'Questão comercial',
    'outro': 'Outro'
  }
  return subjects[subject] || subject
}

export default {
  sendDemoEmailWithEmailJS,
  sendSupportEmailWithEmailJS,
  sendConfirmationEmailWithEmailJS
} 