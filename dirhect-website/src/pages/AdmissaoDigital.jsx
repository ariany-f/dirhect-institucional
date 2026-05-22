import { useState, useEffect } from 'react'
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Zap,
  ArrowRight,
  Building2,
  Calendar,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Award,
  TrendingUp,
  Target,
  Rocket,
  Star,
  Heart,
  Gift
} from 'lucide-react'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import PhoneInput from '../components/PhoneInput'
import { sendDemoEmail } from '../services/emailService'
import './AdmissaoDigital.css'

const AdmissaoDigital = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    funcionarios: '',
    mensagem: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const funcionariosOptions = [
    '1-10 funcionários',
    '11-50 funcionários',
    '51-200 funcionários',
    '201-500 funcionários',
    '501-1000 funcionários',
    'Mais de 1000 funcionários'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const requiredFields = ['nome', 'email', 'telefone', 'empresa', 'funcionarios']
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '')
      
      if (missingFields.length > 0) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.')
      }

      const result = await sendDemoEmail(formData)

      if (result.success) {
        setSubmitSuccess(true)
        console.log('Solicitação enviada:', result)
      } else {
        throw new Error(result.message || 'Erro ao enviar solicitação')
      }

    } catch (error) {
      console.error('Erro ao enviar solicitação:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div>
        <Header />
        <div className="admissao-success">
          <div className="container">
            <div className="admissao-success-content">
              <div className="admissao-success-icon">
                <CheckCircle2 size={80} />
              </div>
              <h1>Solicitação Enviada com Sucesso!</h1>
              <p>
                Obrigado pelo interesse na nossa solução de Admissão Digital! 
                Nossa equipe entrará em contato em até 24 horas para agendar uma demonstração.
              </p>
              <div className="admissao-success-info">
                <div className="admissao-info-item">
                  <Clock size={20} />
                  <span>Contato em até 24h</span>
                </div>
                <div className="admissao-info-item">
                  <Shield size={20} />
                  <span>Demonstração gratuita</span>
                </div>
                <div className="admissao-info-item">
                  <Zap size={20} />
                  <span>Implementação rápida</span>
                </div>
                <div className="admissao-info-item">
                  <Award size={20} />
                  <span>Suporte especializado</span>
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
      
      {/* Hero Section */}
      <section className="admissao-hero">
        <div className="admissao-hero-background">
          <img 
            src="/images/pilares/admissao-digital.jpg" 
            alt="Admissão Digital" 
            className="admissao-hero-bg-image"
          />
        </div>
        <div className="container">
          <div className="admissao-hero-content">
            <div className="admissao-hero-text">
              <div className="admissao-professional-badge">
                <FileText size={16} />
                <span>Solução de Admissão Digital</span>
              </div>
              <h1>
                Transforme a <span className="admissao-gradient-text">admissão</span> em uma 
                experiência <span className="admissao-highlight">digital e eficiente</span>
              </h1>
              <p>
                Elimine papelada, reduza erros e acelere o processo de contratação 
                com nossa plataforma completa de admissão digital.
              </p>
              <div className="admissao-hero-stats">
                <div className="admissao-stat-item">
                  <Clock size={20} />
                  <div>
                    <strong>90%</strong>
                    <span>Menos tempo</span>
                  </div>
                </div>
                <div className="admissao-stat-item">
                  <Shield size={20} />
                  <div>
                    <strong>100%</strong>
                    <span>Conformidade</span>
                  </div>
                </div>
                <div className="admissao-stat-item">
                  <CheckCircle2 size={20} />
                  <div>
                    <strong>Zero</strong>
                    <span>Erros manuais</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('admissao-form').scrollIntoView({ behavior: 'smooth' })}
                className="admissao-cta-button"
              >
                <Rocket size={20} />
                Solicitar Demonstração
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="admissao-beneficios">
        <div className="container">
          <h2>Por que escolher a Admissão Digital da Dirhect?</h2>
          <p className="admissao-subtitle">
            Simplifique todo o processo de contratação com tecnologia avançada e conformidade total
          </p>
          <div className="admissao-beneficios-grid">
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <Zap size={32} />
              </div>
              <h3>Processo 90% mais rápido</h3>
              <p>
                Automatize a coleta de documentos, assinaturas digitais e integração 
                com sistemas de RH, reduzindo o tempo de admissão drasticamente.
              </p>
            </div>
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <Shield size={32} />
              </div>
              <h3>100% em conformidade</h3>
              <p>
                Garanta que todos os documentos estejam de acordo com a legislação 
                trabalhista e previdenciária, evitando multas e problemas legais.
              </p>
            </div>
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <CheckCircle2 size={32} />
              </div>
              <h3>Zero erros manuais</h3>
              <p>
                Elimine erros de digitação, documentos perdidos e inconsistências 
                com validação automática e fluxos inteligentes.
              </p>
            </div>
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <Users size={32} />
              </div>
              <h3>Experiência do candidato</h3>
              <p>
                Ofereça uma experiência moderna e profissional que impressiona 
                os candidatos e fortalece a marca empregadora da empresa.
              </p>
            </div>
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <Building2 size={32} />
              </div>
              <h3>Integração completa</h3>
              <p>
                Conecte-se com sistemas de RH, folha de pagamento, benefícios 
                e outros sistemas da empresa de forma transparente.
              </p>
            </div>
            <div className="admissao-beneficio-item">
              <div className="admissao-beneficio-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Relatórios e analytics</h3>
              <p>
                Acompanhe métricas de eficiência, tempo de processo e 
                conformidade com dashboards em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="admissao-como-funciona">
        <div className="container">
          <h2>Como funciona a Admissão Digital?</h2>
          <p className="admissao-subtitle">
            Processo simples e eficiente em apenas 4 passos
          </p>
          <div className="admissao-steps-grid">
            <div className="admissao-step-item">
              <div className="admissao-step-number">1</div>
              <div className="admissao-step-icon">
                <Users size={40} />
              </div>
              <h3>Cadastro do candidato</h3>
              <p>
                O candidato acessa o portal digital e preenche seus dados pessoais, 
                profissionais e documentos necessários de forma segura.
              </p>
            </div>
            <div className="admissao-step-item">
              <div className="admissao-step-number">2</div>
              <div className="admissao-step-icon">
                <FileText size={40} />
              </div>
              <h3>Validação automática</h3>
              <p>
                Nossa plataforma valida automaticamente todos os documentos 
                e informações, garantindo conformidade e completude.
              </p>
            </div>
            <div className="admissao-step-item">
              <div className="admissao-step-number">3</div>
              <div className="admissao-step-icon">
                <CheckCircle2 size={40} />
              </div>
              <h3>Assinatura digital</h3>
              <p>
                Contratos e documentos são assinados digitalmente com 
                validade legal, eliminando a necessidade de papel.
              </p>
            </div>
            <div className="admissao-step-item">
              <div className="admissao-step-number">4</div>
              <div className="admissao-step-icon">
                <Rocket size={40} />
              </div>
              <h3>Integração e ativação</h3>
              <p>
                O colaborador é automaticamente integrado aos sistemas 
                da empresa e pode começar suas atividades imediatamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="admissao-recursos">
        <div className="container">
          <h2>Recursos da Plataforma</h2>
          <div className="admissao-recursos-grid">
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <Smartphone size={24} />
              </div>
              <h4>Portal mobile-first</h4>
              <p>Interface responsiva que funciona perfeitamente em qualquer dispositivo</p>
            </div>
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <Shield size={24} />
              </div>
              <h4>Assinatura digital</h4>
              <p>Assinaturas com certificação digital e validade legal</p>
            </div>
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <FileText size={24} />
              </div>
              <h4>Documentos automáticos</h4>
              <p>Geração automática de contratos e documentos personalizados</p>
            </div>
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <CheckCircle2 size={24} />
              </div>
              <h4>Validação inteligente</h4>
              <p>Verificação automática de documentos e informações</p>
            </div>
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <Building2 size={24} />
              </div>
              <h4>Integração API</h4>
              <p>Conecta-se com sistemas existentes da empresa</p>
            </div>
            <div className="admissao-recurso-item">
              <div className="admissao-recurso-icon">
                <TrendingUp size={24} />
              </div>
              <h4>Analytics avançado</h4>
              <p>Relatórios detalhados e métricas de performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="admissao-cta">
        <div className="container">
          <div className="admissao-cta-content">
            <h2>Pronto para transformar sua admissão?</h2>
            <p>
              Junte-se a centenas de empresas que já otimizaram seus processos 
              de contratação com a Dirhect
            </p>
            <button 
              onClick={() => document.getElementById('admissao-form').scrollIntoView({ behavior: 'smooth' })}
              className="admissao-cta-btn"
            >
              <ArrowRight size={18} />
              Solicitar Demonstração Gratuita
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="admissao-form" className="admissao-formulario-section">
        <div className="container">
          <div className="admissao-form-content">
            <div className="admissao-form-header">
              <h2>Solicite sua demonstração</h2>
              <p>Preencha os dados e nossa equipe entrará em contato para agendar uma demonstração personalizada</p>
            </div>
            
            <form onSubmit={handleSubmit} className="admissao-form">
              <div className="admissao-form-grid">
                <div className="admissao-form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu.email@empresa.com"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>Empresa *</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nome da sua empresa"
                    required
                  />
                </div>
                <div className="admissao-form-group">
                  <label>Número de Funcionários *</label>
                  <select
                    name="funcionarios"
                    value={formData.funcionarios}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione a quantidade</option>
                    {funcionariosOptions.map(opcao => (
                      <option key={opcao} value={opcao}>{opcao}</option>
                    ))}
                  </select>
                </div>
                <div className="admissao-form-group admissao-form-group-full">
                  <label>Mensagem (opcional)</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos mais sobre suas necessidades..."
                    rows="4"
                  />
                </div>
              </div>

              {submitError && (
                <div className="admissao-error-message">
                  <p>{submitError}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="admissao-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="admissao-submit-spinner"></div>
                    Enviando solicitação...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Solicitar Demonstração
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AdmissaoDigital 