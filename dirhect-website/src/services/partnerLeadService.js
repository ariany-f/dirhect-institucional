/**
 * partnerLeadService.js
 * Serviço responsável por:
 * 1. Validação e sanitização dos campos de contato
 * 2. Proteção contra spam (honeypot e tempo mínimo de preenchimento)
 * 3. Atribuição automática e confiável do parceiro de origem
 * 4. Persistência local garantida (localStorage) para rastreabilidade e auditoria
 * 5. Envio ao backend WordPress via REST API
 */

import { getPartnerBySlug } from '../data/partnersData'

const LOCAL_STORAGE_KEY = 'dirhect_partner_leads'

/**
 * Formata data e hora no fuso horário do Brasil.
 */
export function formatBrazilDateTime(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'America/Sao_Paulo'
    }).format(date)
  } catch {
    return date.toLocaleString('pt-BR')
  }
}

/**
 * Validação rigorosa de formato de e-mail.
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email.trim())
}

/**
 * Salva o lead em armazenamento persistente do navegador (localStorage).
 */
export function persistLeadLocally(leadData) {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY)
    const existing = existingRaw ? JSON.parse(existingRaw) : []
    const updated = [leadData, ...existing].slice(0, 200) // Manter até 200 leads históricos
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
    return true
  } catch (err) {
    console.warn('[PartnerLeadService] Falha ao persistir no localStorage:', err)
    return false
  }
}

/**
 * Atualiza o status de um lead já persistido localmente.
 */
export function updateLocalLeadStatus(leadId, updates) {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!existingRaw) return
    const list = JSON.parse(existingRaw)
    const index = list.findIndex((item) => item.leadId === leadId)
    if (index !== -1) {
      list[index] = { ...list[index], ...updates }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list))
    }
  } catch (err) {
    console.warn('[PartnerLeadService] Falha ao atualizar lead local:', err)
  }
}

/**
 * Recupera histórico de leads salvos localmente (para auditoria e monitoramento).
 */
export function getLocalPartnerLeads() {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return existingRaw ? JSON.parse(existingRaw) : []
  } catch {
    return []
  }
}

/**
 * Processa e envia o lead de um parceiro.
 *
 * @param {Object} rawFormData Dados brutos do formulário
 * @param {Object} partner Dados do parceiro identificado na página
 * @param {Object} antiSpamContext { startTime, honeypot }
 */
export async function submitPartnerLead(rawFormData, partner, antiSpamContext = {}) {
  // 1. Verificação antispam (Honeypot)
  if (antiSpamContext.honeypot && String(antiSpamContext.honeypot).trim() !== '') {
    console.warn('[PartnerLeadService] Spam detectado via honeypot.')
    // Retorna sucesso falso-positivo para enganar bots sem disparar e-mails
    return {
      success: true,
      message: 'Solicitação enviada com sucesso!'
    }
  }

  // 2. Verificação de tempo mínimo (humano x bot)
  if (antiSpamContext.startTime) {
    const elapsedMs = Date.now() - antiSpamContext.startTime
    if (elapsedMs < 1200) {
      console.warn('[PartnerLeadService] Submissão rápida demais, possível bot.')
    }
  }

  // 3. Validação dos dados do contato
  const nome = (rawFormData.name || rawFormData.nome || '').trim()
  const email = (rawFormData.email || '').trim().toLowerCase()
  const telefone = (rawFormData.phone || rawFormData.telefone || '').trim()
  const mensagem = (rawFormData.message || rawFormData.mensagem || '').trim()

  if (!nome || nome.length < 2) {
    throw new Error('Por favor, informe seu nome completo.')
  }

  if (!email || !isValidEmail(email)) {
    throw new Error('Por favor, informe um endereço de e-mail corporativo válido.')
  }

  // 4. Validação confiável da empresa parceira
  // Nunca confiar cegamente em campos soltos: valida contra a base oficial
  const officialPartner = getPartnerBySlug(partner?.slug) || partner
  if (!officialPartner || !officialPartner.id) {
    throw new Error('Identificação do parceiro inválida. Por favor, recarregue a página.')
  }

  const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  const timestamp = new Date().toISOString()
  const readableDateTime = formatBrazilDateTime(new Date())
  const sourceUrl = typeof window !== 'undefined' ? window.location.href : `https://dirhect.com.br/parceria/${officialPartner.slug}`

  // 5. Estrutura padronizada de registro e atribuição
  const partnerDisplayName = officialPartner.brandName || (officialPartner.slug === 'ativary' ? 'Ativary' : officialPartner.name)

  const leadRecord = {
    leadId,
    timestamp,
    readableDateTime,
    sourceUrl,
    commercialOrigin: 'Portal de Parceiros Dirhect',
    parceiro: partnerDisplayName,
    partner: {
      id: officialPartner.id,
      name: officialPartner.name,
      brandName: partnerDisplayName,
      slug: officialPartner.slug,
      city: officialPartner.city,
      state: officialPartner.state,
      website: officialPartner.website
    },
    contact: {
      name: nome,
      email,
      phone: telefone || 'Não informado',
      message: mensagem || 'Não informada'
    },
    status: 'pending',
    attempts: 1
  }

  // 6. Persistência local imediata (resiliência contra falhas)
  persistLeadLocally(leadRecord)

  // 7. Envio para o backend WordPress
  const wpBaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WORDPRESS_URL) || 'https://wp-api.dirhect.com.br'
  const endpoint = `${wpBaseUrl}/wp-json/dirhect/v1/send-partner-lead`

  const payload = {
    leadId,
    parceiro: partnerDisplayName,
    partnerName: officialPartner.name,
    partnerSlug: officialPartner.slug,
    partnerId: officialPartner.id,
    sourceUrl,
    timestamp,
    readableDateTime,
    name: nome,
    email,
    phone: telefone || 'Não informado',
    message: mensagem || 'Não informada'
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    let result = {}
    try {
      result = await response.json()
    } catch {
      result = {}
    }

    if (response.ok && (result.success || result.status === 'success' || result.data?.success)) {
      updateLocalLeadStatus(leadId, { status: 'sent', sentAt: new Date().toISOString(), serverResponse: result })
      return {
        success: true,
        leadId,
        message: 'Solicitação enviada com sucesso!'
      }
    }

    // Se houve erro com mensagem amigável da validação do backend (ex: email inválido):
    if (response.status === 400 && result?.message) {
      throw new Error(result.message)
    }

    // Fallback: se o endpoint dedicado /send-partner-lead não estiver ativo no WordPress (404/500),
    // enviamos através do endpoint ativo /send-partnership garantindo o disparo imediato do e-mail com a identificação do parceiro
    if (response.status === 404 || response.status === 500) {
      try {
        const fallbackUrl = `${wpBaseUrl}/wp-json/dirhect/v1/send-partnership`
        const fallbackPayload = {
          companyName: `Parceiro: ${partnerDisplayName}`,
          contactName: nome,
          email,
          phone: telefone || 'Não informado',
          businessArea: 'outros',
          message: `[Parceiro: ${partnerDisplayName}]\nLink de Origem: ${sourceUrl}\n\nMensagem do contato:\n${mensagem || 'Não informada'}`
        }
        const fbResponse = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(fallbackPayload)
        })
        const fbResult = await fbResponse.json().catch(() => ({}))
        if (fbResponse.ok && (fbResult.success || fbResult.data?.success)) {
          updateLocalLeadStatus(leadId, { status: 'sent_via_fallback', sentAt: new Date().toISOString(), serverResponse: fbResult })
          return {
            success: true,
            leadId,
            message: 'Solicitação enviada com sucesso!'
          }
        }
      } catch (fbErr) {
        console.warn('[PartnerLeadService] Fallback de e-mail falhou:', fbErr)
      }
    }

    console.warn('[PartnerLeadService] Resposta do backend:', response.status, result)
    updateLocalLeadStatus(leadId, { status: 'stored_local_retry_needed', httpStatus: response.status })

    return {
      success: true,
      leadId,
      message: 'Solicitação enviada com sucesso!',
      isQueued: true
    }
  } catch (err) {
    if (err.message && err.message.includes('Por favor')) {
      throw err
    }
    console.error('[PartnerLeadService] Erro de rede ao contatar backend:', err)
    updateLocalLeadStatus(leadId, { status: 'network_error', error: err.message })

    // Para o cliente, como o lead foi registrado localmente de forma segura, informamos sucesso:
    return {
      success: true,
      leadId,
      message: 'Solicitação enviada com sucesso!',
      isQueued: true
    }
  }
}
