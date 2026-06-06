import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import { Users, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react'
import PhoneInput from '../components/PhoneInput'
import { sendDemoEmail } from '../services/emailService'
import './Demo.css'

const Demo = () => {
  const [formData, setFormData] = useState({
    nomeEmpresa: 'Não Informado',
    nomeContato: '',
    email: '',
    telefone: '',
    cargo: '',
    numeroFuncionarios: '1-10 funcionários',
    segmento: 'Outros',
    cnpj: '00.000.000/0000-00',
    necessidades: [],
    mensagem: '',
    aceiteTermos: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Validar campos obrigatórios
      const requiredFields = ['nomeContato', 'email', 'telefone', 'cargo']
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '')
      
      if (missingFields.length > 0) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.')
      }

      if (!formData.aceiteTermos) {
        throw new Error('É necessário aceitar os termos e condições.')
      }

      // Enviar email para a equipe comercial (auto-reply será enviado automaticamente)
      try {
        const emailResult = await sendDemoEmail(formData)
        console.log('Email enviado:', emailResult)
        
        if (!emailResult.success) {
          console.warn('Erro no email principal:', emailResult.message)
          // Mostrar erro específico do email
          setSubmitError(`Erro no envio do email: ${emailResult.message}`)
          return
        }
        
        setSubmitSuccess(true)
      } catch (emailError) {
        console.error('Erro ao enviar emails:', emailError)
        setSubmitError(`Erro inesperado: ${emailError.message}`)
        return
      }

    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div>
        <Header />
        <div className="demo-success">
          <div className="home-fold-container">
            <div className="success-content">
              <div className="success-icon">
                <CheckCircle2 size={80} />
              </div>
              <h1>Solicitação Enviada com Sucesso!</h1>
              <p>
                Obrigado pelo seu interesse na Dirhect. Nossa equipe entrará em contato 
                em até 24 horas para agendar sua demonstração personalizada.
              </p>
              <div className="success-info">
                <div className="info-item">
                  <Calendar size={20} />
                  <span>Demonstração em até 24h</span>
                </div>
                <div className="info-item">
                  <Users size={20} />
                  <span>Consultoria especializada</span>
                </div>
              </div>
              <button className="btn-primary" onClick={() => window.location.href = '/'}>
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <section className="demo-hero">
        <div className="home-fold-container">
          <div className="demo-header">
            <h1>Solicite uma <span className="gradient-text">Demonstração</span></h1>
            <p>
              Veja como a Dirhect pode revolucionar a gestão de RH da sua empresa. 
              Agende uma demonstração personalizada e gratuita.
            </p>
          </div>
        </div>
      </section>

      <section className="demo-form-section">
        <div className="home-fold-container">
          <div className="demo-content">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="demo-form">
                <div className="form-section">
                  <h3>Deixar o meu contato</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <div className="input-wrapper">
                        <Users size={20} />
                        <input
                          type="text"
                          name="nomeContato"
                          value={formData.nomeContato}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>E-mail Corporativo *</label>
                      <div className="input-wrapper">
                        <Mail size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu.email@empresa.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cargo/Função *</label>
                      <input
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleInputChange}
                        placeholder="Ex: Gerente de RH"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <PhoneInput
                        id="telefone"
                        name="telefone"
                        label="Telefone *"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <label className="checkbox-item terms-checkbox">
                    <input
                      type="checkbox"
                      name="aceiteTermos"
                      checked={formData.aceiteTermos}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    <div className="terms-text">
                      Aceito os termos e condições: *
                      <div className="terms-links">
                        <a href="/termos-uso" target="_blank" rel="noopener noreferrer">Termos de Uso</a>
                        <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>
                      </div>
                    </div>
                  </label>
                </div>

                {submitError && (
                  <div className="demo-error-message">
                    <p>{submitError}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="submit-spinner"></div>
                      Enviando solicitação...
                    </>
                  ) : (
                    'Solicitar Demonstração'
                  )}
                </button>
              </form>
            </div>

            <div className="demo-benefits">
              <h3>Entrar em contato</h3>
              
              <div className="contact-info">
                <h4>Entre em contato diretamente:</h4>
                <div className="contact-methods">
                  <div className="contact-method">
                    <Phone size={20} />
                    <span>(11) 96898-9211</span>
                  </div>
                  <div className="contact-method">
                    <Mail size={20} />
                    <span>contato@dirhect.com.br</span>
                  </div>
                </div>
              </div>

              <div className="benefits-list">
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Análise Personalizada</h4>
                    <p>Avaliação específica das necessidades da sua empresa</p>
                  </div>
                </div>
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Demo Ao Vivo</h4>
                    <p>Apresentação completa das funcionalidades da plataforma</p>
                  </div>
                </div>
                <div className="demo-benefit-item">
                  <CheckCircle2 size={24} />
                  <div>
                    <h4>Proposta Customizada</h4>
                    <p>Plano sob medida para o seu negócio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Demo 