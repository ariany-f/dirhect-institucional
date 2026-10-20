import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Send, CheckCircle2, AlertCircle, Loader2, Lock, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { submitPartnerLead } from '../../services/partnerLeadService'
import './PartnerContactForm.css'

export default function PartnerContactForm({ partner }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '' // Campo antispam
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [serverError, setServerError] = useState('')
  const formStartTimeRef = useRef(Date.now())

  useEffect(() => {
    formStartTimeRef.current = Date.now()
  }, [partner?.id])

  // Máscara amigável de telefone brasileiro (ou internacional)
  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '')
    if (digits.length <= 10) {
      // (XX) XXXX-XXXX
      return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14)
    }
    // (XX) XXXXX-XXXX
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Limpa o erro do campo quando o usuário digita
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (serverError) {
      setServerError('')
    }
  }

  const validate = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = 'Por favor, informe seu nome completo.'
    } else if (formData.name.trim().length < 3) {
      errors.name = 'O nome deve ter pelo menos 3 caracteres.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'Por favor, informe seu e-mail corporativo.'
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Formato de e-mail inválido. Exemplo: nome@suaempresa.com.br'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setServerError('')

    try {
      await submitPartnerLead(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        partner,
        {
          startTime: formStartTimeRef.current,
          honeypot: formData.honeypot
        }
      )

      setSubmitSuccess(true)
    } catch (err) {
      console.error('[PartnerContactForm] Erro ao enviar solicitação:', err)
      setServerError(
        err.message || 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      honeypot: ''
    })
    setFormErrors({})
    setServerError('')
    setSubmitSuccess(false)
    formStartTimeRef.current = Date.now()
  }

  if (submitSuccess) {
    return (
      <div className="partner-form-card partner-form-card--success" role="status" aria-live="polite">
        <div className="partner-form-success-icon-wrap">
          <CheckCircle2 size={42} className="partner-form-success-icon" />
        </div>
        <h3 className="partner-form-success-title">Solicitação enviada com sucesso!</h3>
        <p className="partner-form-success-desc">
          Nossa equipe recebeu seus dados e entrará em contato em breve.
        </p>

        <div className="partner-form-success-attribution">
          <span className="partner-form-attribution-label">Indicação Comercial</span>
          <span className="partner-form-attribution-partner">{partner.name}</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="partner-form-reset-btn"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <div className="partner-form-card">
      <div className="partner-form-header">
        <h2 className="partner-form-title">Entre em Contato</h2>
        <p className="partner-form-subtitle">Solicite uma demonstração ou mais informações.</p>
      </div>

      {serverError && (
        <div className="partner-form-alert" role="alert">
          <AlertCircle size={18} className="partner-form-alert-icon" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="partner-form-body" noValidate>
        {/* Campo Honeypot antispam invisível para humanos */}
        <div className="partner-form-hp" aria-hidden="true">
          <label htmlFor="website_hp">Não preencha este campo</label>
          <input
            type="text"
            id="website_hp"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* 1. Nome Completo */}
        <div className="partner-form-group">
          <label htmlFor="partner-form-name" className="partner-form-label">
            Seu nome completo <span className="partner-form-required">*</span>
          </label>
          <div className="partner-form-input-wrapper">
            <User size={18} className="partner-form-input-icon" aria-hidden="true" />
            <input
              type="text"
              id="partner-form-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={`partner-form-input ${formErrors.name ? 'partner-form-input--error' : ''}`}
              required
              disabled={isSubmitting}
            />
          </div>
          {formErrors.name && (
            <span className="partner-form-error-msg" role="alert">
              {formErrors.name}
            </span>
          )}
        </div>

        {/* 2. E-mail Corporativo */}
        <div className="partner-form-group">
          <label htmlFor="partner-form-email" className="partner-form-label">
            Seu e-mail corporativo <span className="partner-form-required">*</span>
          </label>
          <div className="partner-form-input-wrapper">
            <Mail size={18} className="partner-form-input-icon" aria-hidden="true" />
            <input
              type="email"
              id="partner-form-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@suaempresa.com.br"
              className={`partner-form-input ${formErrors.email ? 'partner-form-input--error' : ''}`}
              required
              disabled={isSubmitting}
            />
          </div>
          {formErrors.email && (
            <span className="partner-form-error-msg" role="alert">
              {formErrors.email}
            </span>
          )}
        </div>

        {/* 3. Telefone (opcional) */}
        <div className="partner-form-group">
          <label htmlFor="partner-form-phone" className="partner-form-label">
            Seu telefone <span className="partner-form-optional">(opcional)</span>
          </label>
          <div className="partner-form-input-wrapper">
            <Phone size={18} className="partner-form-input-icon" aria-hidden="true" />
            <input
              type="tel"
              id="partner-form-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              className="partner-form-input"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* 4. Mensagem (opcional) */}
        <div className="partner-form-group">
          <label htmlFor="partner-form-message" className="partner-form-label">
            Sua mensagem <span className="partner-form-optional">(opcional)</span>
          </label>
          <div className="partner-form-textarea-wrapper">
            <MessageSquare size={18} className="partner-form-textarea-icon" aria-hidden="true" />
            <textarea
              id="partner-form-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva seu desafio atual ou solução desejada..."
              className="partner-form-textarea"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Informação de Privacidade LGPD */}
        <div className="partner-form-privacy">
          <Lock size={13} className="partner-form-privacy-icon" aria-hidden="true" />
          <span>
            Ao enviar, você concorda com o tratamento de dados pessoais conforme a nossa{' '}
            <Link to="/politica-privacidade" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </Link>.
          </span>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          className="partner-form-submit-btn"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="partner-form-spinner" />
              <span>Enviando solicitação...</span>
            </>
          ) : (
            <>
              <span>Enviar Solicitação</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
