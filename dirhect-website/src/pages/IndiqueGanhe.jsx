import { useState, useEffect, useRef } from 'react'
import { 
  Gift, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Sparkles,
  Target,
  Rocket,
  Crown,
  Gem,
  Calendar,
  FileText,
  UserCheck,
  Building
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { sendIndicationEmail } from '../services/emailService'
import './IndiqueGanhe.css'

const IndiqueGanhe = () => {
  const [formData, setFormData] = useState({
    // Dados do indicador
    nomeIndicador: '',
    emailIndicador: '',
    telefoneIndicador: '',
    empresaIndicador: '',
    
    // Dados da empresa indicada
    nomeEmpresa: '',
    cnpj: '',
    segmento: '',
    numeroFuncionarios: '',
    nomeContato: '',
    cargoContato: '',
    emailContato: '',
    telefoneContato: '',
    mensagem: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [isVisible, setIsVisible] = useState({})
  const formRef = useRef(null)

  // Função para aplicar máscara de CNPJ
  const formatCNPJ = (value) => {
    const cleanValue = value.replace(/\D/g, '')
    
    if (cleanValue.length <= 2) {
      return cleanValue
    } else if (cleanValue.length <= 5) {
      return cleanValue.replace(/(\d{2})(\d{0,3})/, '$1.$2')
    } else if (cleanValue.length <= 8) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else if (cleanValue.length <= 12) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4')
    } else {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5')
    }
  }

  // Função para aplicar máscara de telefone
  const formatPhone = (value) => {
    const cleanValue = value.replace(/\D/g, '')
    
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3')
    }
    return cleanValue
  }

  // Função para detectar elementos visíveis na tela
  const handleScroll = () => {
    const sections = document.querySelectorAll('.indique-como-funciona, .indique-regras-section, .indique-formulario-section, .indique-beneficios-section, .indique-vantagens-section')
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
      
      if (isVisible) {
        setIsVisible(prev => ({ ...prev, [section.className]: true }))
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Verificar elementos visíveis inicialmente
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const segmentosOptions = [
    'Tecnologia',
    'Varejo',
    'Indústria',
    'Serviços',
    'Saúde',
    'Educação',
    'Financeiro',
    'Consultoria',
    'Logística',
    'Outros'
  ]

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
    
    // Aplicar formatação especial
    let formattedValue = value
    if (name.includes('cnpj')) {
      formattedValue = formatCNPJ(value)
    } else if (name.includes('telefone')) {
      formattedValue = formatPhone(value)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Validar campos obrigatórios
      const requiredFields = [
        'nomeIndicador', 'emailIndicador', 'telefoneIndicador', 'empresaIndicador',
        'nomeEmpresa', 'cnpj', 'segmento', 'numeroFuncionarios',
        'nomeContato', 'cargoContato', 'emailContato', 'telefoneContato'
      ]
      
      const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '')
      
      if (missingFields.length > 0) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.')
      }

      // Enviar email de indicação
      const result = await sendIndicationEmail(formData)

      if (result.success) {
        setSubmitSuccess(true)
        console.log('Indicação enviada:', result)
      } else {
        throw new Error(result.message || 'Erro ao enviar indicação')
      }

    } catch (error) {
      console.error('Erro ao enviar indicação:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div>
        <Header />
        <div className="indique-success">
          <div className="container">
            <div className="indique-success-content">
              <div className="indique-success-icon">
                <Crown size={80} />
              </div>
              <h1>Indicação Enviada com Sucesso!</h1>
              <p>
                Obrigado por indicar a Dirhect! Nossa equipe entrará em contato 
                com a empresa indicada em até 24 horas.
              </p>
              <div className="indique-success-info">
                <div className="indique-info-item">
                  <CheckCircle2 size={20} />
                  <span>Indicação registrada</span>
                </div>
                <div className="indique-info-item">
                  <Award size={20} />
                  <span>Recompensa garantida se contratar</span>
                </div>
                <div className="indique-info-item">
                  <Clock size={20} />
                  <span>Contato em até 24h</span>
                </div>
                <div className="indique-info-item">
                  <DollarSign size={20} />
                  <span>R$ 1.000 por indicação</span>
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
      
      {/* Hero Section - Inspirado no iFood */}
      <section className="indique-hero">
        <div className="indique-hero-content">
          <div className="indique-hero-text">
            <div className="indique-celebration-badge">
              <Star size={20} />
              <span>Celebre o sucesso da Dirhect</span>
            </div>
            <h1>
              Indique a <span className="indique-gradient-text">Dirhect</span> e 
              <br />ganhe <span className="indique-highlight">R$ 1.000</span> na conta!
            </h1>
            <p className="indique-hero-subtitle">
              Válido para empresas com mais de 10 colaboradores. 
              Empresas com menos de 10 colaboradores, o prêmio continua R$ 1.000.
            </p>
            <div className="indique-hero-stats">
              <div className="indique-stat-item">
                <TrendingUp size={24} />
                <div>
                  <strong>500+</strong>
                  <span>Empresas indicadas</span>
                </div>
              </div>
              <div className="indique-stat-item">
                <Award size={24} />
                <div>
                  <strong>R$ 50k+</strong>
                  <span>Em recompensas</span>
                </div>
              </div>
              <div className="indique-stat-item">
                <Heart size={24} />
                <div>
                  <strong>98%</strong>
                  <span>Satisfação</span>
                </div>
              </div>
            </div>
            <button 
              onClick={scrollToForm}
              className="indique-cta-button"
            >
              <Sparkles size={20} />
              Indique Agora
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="indique-hero-image">
            <div className="indique-reward-card">
              <Gem size={48} />
              <h3>R$ 1.000</h3>
              <p>Por indicação aprovada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona - Inspirado no iFood */}
      <section className={`indique-como-funciona ${isVisible['indique-como-funciona'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Como indicar a Dirhect?</h2>
          <div className="indique-steps-grid">
            <div className="indique-step-item">
              <div className="indique-step-number">1</div>
              <div className="indique-step-icon">
                <FileText size={32} />
              </div>
              <h3>Preencha o formulário</h3>
              <p>
                Preencha o formulário de indicação corretamente com seus dados 
                e da empresa indicada.
              </p>
            </div>
            <div className="indique-step-item">
              <div className="indique-step-number">2</div>
              <div className="indique-step-icon">
                <Building size={32} />
              </div>
              <h3>Indique quantas empresas quiser</h3>
              <p>
                Indique quantas empresas quiser. Quanto mais indicar, 
                mais chances de ganhar.
              </p>
            </div>
            <div className="indique-step-item">
              <div className="indique-step-number">3</div>
              <div className="indique-step-icon">
                <Crown size={32} />
              </div>
              <h3>Receba sua recompensa</h3>
              <p>
                Se a empresa indicada contratar e recarregar com a Dirhect, 
                você recebe a recompensa até o 10º dia útil do mês subsequente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regras - Inspirado no iFood */}
      <section className={`indique-regras-section ${isVisible['indique-regras-section'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>Atenção às regras da premiação</h2>
          <div className="indique-regras-grid">
            <div className="indique-regra-item">
              <UserCheck size={24} />
              <div>
                <h4>Você não pode indicar sua própria empresa</h4>
                <p>Você, como pessoa física, não pode indicar a sua pessoa jurídica, ou seja, você não pode indicar uma empresa sua ou que você é responsável.</p>
              </div>
            </div>
            <div className="indique-regra-item">
              <Building2 size={24} />
              <div>
                <h4>Empresas elegíveis</h4>
                <p>Empresas classificadas como MEI não são elegíveis para recebimento do prêmio. A empresa deve ter CNPJ ativo.</p>
              </div>
            </div>
            <div className="indique-regra-item">
              <Shield size={24} />
              <div>
                <h4>Empresa não pode estar em negociação</h4>
                <p>A empresa que você indicou não pode estar em processo de negociação com a Dirhect e não pode ter sido indicada por outra pessoa.</p>
              </div>
            </div>
            <div className="indique-regra-item">
              <DollarSign size={24} />
              <div>
                <h4>Contratação efetiva</h4>
                <p>Empresas indicadas precisam contratar e fazer recarga mínima para que você receba a recompensa.</p>
              </div>
            </div>
          </div>
          <div className="indique-regulamento-link">
            <button className="indique-regulamento-btn">
              <FileText size={20} />
              Quero conferir o regulamento
            </button>
          </div>
        </div>
      </section>

      {/* Vantagens - Inspirado no iFood */}
      <section className={`indique-vantagens-section ${isVisible['indique-vantagens-section'] ? 'visible' : ''}`}>
        <div className="container">
          <h2>A Dirhect é a solução completa de RH, que vale muito mais que só gestão, ainda vem com vantagens</h2>
          <p className="indique-vantagens-subtitle">
            Portal do RH, gestão de benefícios, admissão digital, relatórios e muito mais. 
            É liberdade para o colaborador, sem taxas para empresa. 
            <strong>Agora ficou fácil de convencer o RH né?</strong>
          </p>
          
          <div className="indique-vantagens-grid">
            <div className="indique-vantagem-item">
              <div className="indique-vantagem-icon">
                <Zap size={32} />
              </div>
              <h3>Portal do RH completo</h3>
              <p>Gestão completa de colaboradores, benefícios, férias e muito mais em uma única plataforma.</p>
            </div>
            <div className="indique-vantagem-item">
              <div className="indique-vantagem-icon">
                <Shield size={32} />
              </div>
              <h3>Segurança e Taxa Zero</h3>
              <p>A empresa que contrata tem a gestão de RH de acordo com a legislação e sem custos adicionais.</p>
            </div>
            <div className="indique-vantagem-item">
              <div className="indique-vantagem-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Mais economia com parceiros</h3>
              <p>Descontos exclusivos com parceiros para aproveitar e economizar em benefícios.</p>
            </div>
            <div className="indique-vantagem-item">
              <div className="indique-vantagem-icon">
                <CheckCircle2 size={32} />
              </div>
              <h3>Tudo em uma plataforma única</h3>
              <p>Todos os recursos são integrados em uma única plataforma, facilitando a gestão.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para RH */}
      <section className="indique-cta-rh">
        <div className="container">
          <div className="indique-cta-content">
            <h2>Se você for <strong>RH ou tomador de decisão</strong> sobre a contratação de benefícios da empresa acesse o site para entender e contratar</h2>
            <button className="indique-cta-rh-btn">
              <ArrowRight size={20} />
              Acessar o site
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section ref={formRef} className={`indique-formulario-section ${isVisible['indique-formulario-section'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="indique-form-content">
            <div className="indique-form-header">
              <h2>Indique uma empresa</h2>
              <p>Preencha os dados e ajude outras empresas a conhecer a Dirhect</p>
            </div>
            
            <form onSubmit={handleSubmit} className="indique-form">
              {/* Dados do Indicador */}
              <div className="indique-form-section">
                <h3>Seus dados (indicador)</h3>
                <div className="indique-form-grid">
                  <div className="indique-form-group">
                    <label>Nome Completo *</label>
                    <input
                      type="text"
                      name="nomeIndicador"
                      value={formData.nomeIndicador}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>E-mail *</label>
                    <input
                      type="email"
                      name="emailIndicador"
                      value={formData.emailIndicador}
                      onChange={handleInputChange}
                      placeholder="seu.email@empresa.com"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>Telefone *</label>
                    <input
                      type="tel"
                      name="telefoneIndicador"
                      value={formData.telefoneIndicador}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>Sua Empresa *</label>
                    <input
                      type="text"
                      name="empresaIndicador"
                      value={formData.empresaIndicador}
                      onChange={handleInputChange}
                      placeholder="Nome da sua empresa"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Dados da Empresa Indicada */}
              <div className="indique-form-section">
                <h3>Dados da empresa indicada</h3>
                <div className="indique-form-grid">
                  <div className="indique-form-group">
                    <label>Nome da Empresa *</label>
                    <input
                      type="text"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      placeholder="Nome da empresa indicada"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>CNPJ *</label>
                    <input
                      type="text"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      placeholder="XX.XXX.XXX/XXXX-XX"
                      maxLength="18"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>Segmento *</label>
                    <select
                      name="segmento"
                      value={formData.segmento}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione o segmento</option>
                      {segmentosOptions.map(segmento => (
                        <option key={segmento} value={segmento}>{segmento}</option>
                      ))}
                    </select>
                  </div>
                  <div className="indique-form-group">
                    <label>Número de Funcionários *</label>
                    <select
                      name="numeroFuncionarios"
                      value={formData.numeroFuncionarios}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecione a quantidade</option>
                      {funcionariosOptions.map(opcao => (
                        <option key={opcao} value={opcao}>{opcao}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dados do Contato */}
              <div className="indique-form-section">
                <h3>Dados do contato na empresa</h3>
                <div className="indique-form-grid">
                  <div className="indique-form-group">
                    <label>Nome do Contato *</label>
                    <input
                      type="text"
                      name="nomeContato"
                      value={formData.nomeContato}
                      onChange={handleInputChange}
                      placeholder="Nome da pessoa responsável"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>Cargo/Função *</label>
                    <input
                      type="text"
                      name="cargoContato"
                      value={formData.cargoContato}
                      onChange={handleInputChange}
                      placeholder="Ex: Gerente de RH"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>E-mail do Contato *</label>
                    <input
                      type="email"
                      name="emailContato"
                      value={formData.emailContato}
                      onChange={handleInputChange}
                      placeholder="contato@empresa.com"
                      required
                    />
                  </div>
                  <div className="indique-form-group">
                    <label>Telefone do Contato *</label>
                    <input
                      type="tel"
                      name="telefoneContato"
                      value={formData.telefoneContato}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Mensagem Adicional */}
              <div className="indique-form-section">
                <div className="indique-form-group">
                  <label>Mensagem adicional (opcional)</label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos mais sobre a empresa ou motivo da indicação..."
                    rows="4"
                  />
                </div>
              </div>

              {submitError && (
                <div className="indique-error-message">
                  <p>{submitError}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="indique-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="indique-submit-spinner"></div>
                    Enviando indicação...
                  </>
                ) : (
                  <>
                    <Gem size={20} />
                    Indique e Ganhe R$ 1.000
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes - Inspirado no iFood */}
      <section className="indique-duvidas-section">
        <div className="container">
          <h2>Dúvidas frequentes</h2>
          <div className="indique-duvidas-grid">
            <div className="indique-duvida-item">
              <h3>Quando e como irei receber meu prêmio?</h3>
              <p>Assim que a empresa indicada realizar o primeiro pagamento, você receberá um e-mail para preenchimento dos dados bancários. O pagamento do prêmio é creditado na sua conta até o 10º dia útil do mês subsequente, mas atenção: os dados bancários precisarão estar em nome do próprio indicador.</p>
            </div>
            <div className="indique-duvida-item">
              <h3>Para quem posso indicar a Dirhect?</h3>
              <p>A Dirhect pode ser indicada para empresas que possuam CNPJ ativo, de qualquer segmento e quantidade de colaboradores. Empresas classificadas como MEI não são elegíveis para recebimento do prêmio.</p>
            </div>
            <div className="indique-duvida-item">
              <h3>Como descubro se a minha indicação contratou a Dirhect?</h3>
              <p>Depois da confirmação de que a empresa que você indicou contratou a Dirhect e realizou o primeiro pagamento, você receberá um e-mail nosso contando a boa notícia e solicitando seus dados bancários para realizarmos o pagamento.</p>
            </div>
            <div className="indique-duvida-item">
              <h3>Como faço o cadastro da minha indicação?</h3>
              <p>É simples! Basta preencher o formulário com os dados da empresa indicada. Se assegure de que está cadastrando o contato da pessoa da área responsável, assim a sua indicação tem muito mais chances de ser bem-sucedida!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default IndiqueGanhe 