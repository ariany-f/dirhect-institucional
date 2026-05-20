import { useState, useEffect } from 'react'
import { 
  Building2, 
  Users, 
  Shield, 
  Database, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Phone,
  Handshake,
  Star,
  Award,
  Globe,
  Lock,
  Cloud,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  BarChart3,
  Heart,
  Target
} from 'lucide-react'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import './Parceiros.css'

const Parceiros = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const slides = [
    {
      title: "Nossa Missão",
      icon: <Target size={48} />,
      content: [
        "O Dirhect foi feito para conectar empresas, pessoas e tecnologia de forma inteligente — e queremos parceiros que compartilhem dessa missão.",
        "Ao se tornar um parceiro Dirhect, você acessa uma plataforma moderna, com módulos completos para digitalização de processos de RH e automação da gestão de benefícios. Mais do que um sistema, você leva inovação para seus clientes e gera uma nova fonte de receita recorrente para o seu negócio."
      ]
    },
    {
      title: "Nossos Valores",
      icon: <Heart size={48} />,
      content: [
        "Mais do que fechar negócios, queremos construir parcerias duradouras, éticas e com foco em resultado.",
        "Se você acredita em transformar o RH com tecnologia acessível e de alta performance, o seu lugar é aqui."
      ]
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 6000) // 6 segundos

    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const scrollToForm = () => {
    const formSection = document.querySelector('.partnership-form-section')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Todos os parceiros em uma única lista
  const allPartners = [
    {
      name: 'SAP',
      logo: '/images/logos/sap-logo.webp',
      category: 'ERP',
      description: 'Integração nativa com SAP HCM para sincronização completa de dados de funcionários e estrutura organizacional.',
      features: ['SAP HCM', 'SAP SuccessFactors', 'SAP Business One'],
      status: 'ERP',
      color: '#0FAAFF'
    },
    {
      name: 'TOTVS',
      logo: '/images/logos/totvs-logo.png',
      category: 'ERP',
      description: 'Conexão direta com TOTVS RM para gestão integrada de recursos humanos e controle de ponto.',
      features: ['TOTVS RM', 'TOTVS Datasul', 'TOTVS Microsiga'],
      status: 'ERP',
      color: '#FF6B35'
    },
    {
      name: 'Closecare',
      logo: '/images/logos/closecare-logo.webp',
      category: 'Gestão de Benefícios',
      description: 'Integração completa com a plataforma Closecare para gestão de benefícios corporativos e saúde ocupacional.',
      features: ['Gestão de Benefícios', 'Saúde Ocupacional', 'Validação de Atestados', 'Relatórios Integrados'],
      status: 'Gestão de Benefícios',
      color: '#00A651'
    },
    {
      name: 'LG Sistemas',
      logo: '/images/logos/lgsistemas-logo.png',
      category: 'ERP',
      description: 'Integração com LG Sistemas para gestão completa de recursos humanos e processos empresariais.',
      features: ['LG RH', 'LG Folha', 'LG Ponto', 'LG Benefícios'],
      status: 'ERP',
      color: '#1E40AF'
    },
    {
      name: 'Pandapé',
      logo: '/images/logos/pandape-logo.svg',
      category: 'Recrutamento e Seleção',
      description: 'Integração com a plataforma Pandapé para otimizar processos de recrutamento e seleção.',
      features: ['Gestão de Vagas', 'Triagem de Candidatos', 'Acompanhamento de Processos', 'Relatórios de R&S'],
      status: 'Recrutamento e Seleção',
      color: '#FF6B35'
    },
    {
      name: 'Gupy',
      logo: '/images/logos/gupy-logo.png',
      category: 'Recrutamento e Seleção',
      description: 'Integração completa com a Gupy para gestão de talentos e processos seletivos.',
      features: ['ATS (Applicant Tracking System)', 'Gestão de Candidatos', 'Avaliações Online', 'Onboarding Digital'],
      status: 'Recrutamento e Seleção',
      color: '#00A651'
    },
    {
      name: 'Nexti RH Inteligente',
      logo: '/images/logos/nexti-logo.png',
      category: 'Gestão de RH',
      description: 'Integração com a Nexti RH Inteligente para automação e otimização de processos de recursos humanos.',
      features: ['Automação de Processos', 'Gestão de Documentos', 'Workflow Inteligente', 'Analytics de RH'],
      status: 'Gestão de RH',
      color: '#8B5CF6'
    }
  ]

  return (
    <div>
      <Header />
      
      {/* Hero Section - Foco em ser parceiro */}
      <section className="partners-hero">
        <div className="container">
          <div className="partners-hero-content">
            <div className="partners-badge">
              <Handshake size={16} />
              <span>Programa de Parcerias</span>
            </div>
            
            <h1 className="partners-title">
              Seja um <span className="gradient-text">Parceiro Dirhect</span>
            </h1>
            
            <p className="partners-subtitle">
              Você é consultor, representa uma consultoria de RH, atua com implantação de sistemas como TOTVS, LG, SAP ou oferece serviços de BPO?
            </p>
            <p className="partners-subtitle">
              O Programa de Parcerias Dirhect é uma oportunidade para empresas que desejam expandir seu portfólio de soluções em RH, oferecendo tecnologia de ponta para automatizar e simplificar a administração de benefícios.
            </p>
            <p className="partners-subtitle">
              Ao indicar ou vender o Dirhect, você aumenta seu faturamento com comissões atrativas e se torna parte da transformação digital na gestão de benefícios, ajudando empresas a ganhar eficiência, reduzir custos e oferecer mais valor aos colaboradores.
            </p>
          </div>
        </div>
      </section>

      {/* Quick CTA Section */}
      <section className="quick-cta-section">
        <div className="container">
          <div className="quick-cta-content">
            <div className="quick-cta-text">
              <h2>Quer ser nosso parceiro?</h2>
              <p>Preencha o formulário e nossa equipe entrará em contato em até 24 horas</p>
            </div>
            <div className="quick-cta-actions">
              <button className="quick-cta-button primary" onClick={scrollToForm}>
                <span>Solicitar Parceria</span>
                <ArrowRight size={16} />
              </button>
              <button className="quick-cta-button secondary">
                <span>Falar com Especialista</span>
                <Phone size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Slider */}
      <section className="mission-values-slider">
        <div className="container">
          <div className="slider-content">
            <div className="slider-text">
              <div className="slide-info">
                <h3>{slides[activeSlide].title}</h3>
                <div className="slide-icon">
                  {slides[activeSlide].icon}
                </div>
              </div>

              {/* Controles do carrossel */}
              <div className="partners-carousel-controls-wrapper">
                <div className="partners-carousel-controls">
                  <button 
                    className="partners-control-btn" 
                    onClick={prevSlide}
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button 
                    className="partners-control-btn partners-play-pause" 
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  
                  <button 
                    className="partners-control-btn" 
                    onClick={nextSlide}
                    aria-label="Próximo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Indicadores */}
                <div className="partners-carousel-indicators">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`partners-indicator ${index === activeSlide ? 'active' : ''}`}
                      onClick={() => setActiveSlide(index)}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="slider-visual">
              <div className="slider-content-container">
                <div className="slide-content">
                  {slides[activeSlide].content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que ser nosso parceiro? */}
      <section className="partnership-benefits-section">
        <div className="container">
          
          <div className="partnership-reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">
                <TrendingUp size={24} />
              </div>
              <div className="reason-content">
                <h5>Amplie</h5>
                <p>Inclua no seu portfólio uma solução completa e integrada para gestão de benefícios, admissão digital, portal de RH e integração com sistemas de folha, consolidando sua empresa como referência em tecnologia para RH.</p>
              </div>
            </div>
            
            <div className="reason-card">
              <div className="reason-icon">
                <BarChart3 size={24} />
              </div>
              <div className="reason-content">
                <h5>Aumente</h5>
                <p>Ganhe comissões recorrentes e novas oportunidades de negócio a cada cliente que implementar o Dirhect com a sua indicação ou apoio comercial.</p>
              </div>
            </div>
            
            <div className="reason-card">
              <div className="reason-icon">
                <Heart size={24} />
              </div>
              <div className="reason-content">
                <h5>Fidelize</h5>
                <p>Ofereça aos seus clientes uma plataforma que automatiza processos, reduz riscos e melhora a experiência do RH e dos colaboradores, garantindo satisfação e retenção.</p>
              </div>
            </div>
            
            <div className="reason-card">
              <div className="reason-icon">
                <Zap size={24} />
              </div>
              <div className="reason-content">
                <h5>Transforme</h5>
                <p>Seja protagonista na digitalização da gestão de benefícios no Brasil, ajudando empresas a otimizar custos, evitar fraudes e dar mais autonomia ao RH.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits - Destaque dos benefícios */}
      <section className="partnership-benefits-section">
        <div className="container">
          <div className="partnership-benefits-header">
            <h2>Vantagens de ser nosso parceiro</h2>
            <p>Descubra os benefícios exclusivos de fazer parte do ecossistema Dirhect</p>
          </div>

          <div className="partnership-benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <TrendingUp size={24} />
              </div>
              <h4>Comissões Recorrentes</h4>
              <p>Comissões por indicação, venda ou suporte, gerando receita recorrente para o seu negócio.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <Shield size={24} />
              </div>
              <h4>Treinamento e Suporte</h4>
              <p>Treinamento gratuito, acesso ao time técnico e suporte exclusivo para parceiros homologados.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <Globe size={24} />
              </div>
              <h4>Ambiente de Demonstração</h4>
              <p>Ambiente seguro para apresentar a solução aos seus clientes com total confiança.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Users size={24} />
              </div>
              <h4>Marketing Conjunto</h4>
              <p>Material de apoio comercial e marketing conjunto para potencializar suas vendas.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Zap size={24} />
              </div>
              <h4>Modelos Flexíveis</h4>
              <p>Modelos de parceria adaptados ao seu perfil: indicação, comercialização ou canal homologado.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <Award size={24} />
              </div>
              <h4>Ganho Escalável</h4>
              <p>Potencial de ganho escalável com bônus por performance e possibilidade de White Label.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners - Exemplos de sucesso */}
      <section className="current-partners-section">
        <div className="container">
          <div className="current-partners-header">
            <h2>Parceiros que já fazem parte do nosso ecossistema</h2>
            <p>Conheça algumas das empresas que já estão conosco revolucionando o RH</p>
          </div>

          <div className="partners-grid">
            {allPartners.map((partner, index) => (
              <div 
                key={partner.name} 
                className="partner-card"
                style={{ 
                  '--animation-delay': `${index * 0.1}s`,
                  '--partner-color': partner.color
                }}
              >
                <div className="partner-card-header">
                  <div className="partner-logo">
                    <img src={partner.logo} alt={`${partner.name} Logo`} />
                  </div>
                  <div className="partner-status">
                    <Star size={16} />
                    <span>{partner.status}</span>
                  </div>
                </div>
                
                <div className="partner-card-content">
                  <div className="partner-info">
                    <h3 className="partner-name">{partner.name}</h3>
                  </div>
                  
                  <p className="partner-description">{partner.description}</p>
                  
                  <div className="partner-features">
                    <h4>Soluções:</h4>
                    <ul>
                      {partner.features.map((feature, idx) => (
                        <li key={idx}>
                          <CheckCircle size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form - Formulário de Parceria */}
      <section className="partnership-form-section">
        <div className="container">
          <div className="partnership-form-content">
            <div className="partnership-form-header">
              <h2>Seja parceiro do Dirhect</h2>
              <p>Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas</p>
            </div>

            <form className="partnership-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company-name">Nome da Empresa *</label>
                  <input 
                    type="text" 
                    id="company-name" 
                    name="companyName" 
                    required 
                    placeholder="Digite o nome da sua empresa"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-name">Nome do Contato *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    name="contactName" 
                    required 
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="business-area">Área de Atuação *</label>
                <select id="business-area" name="businessArea" required>
                  <option value="">Selecione uma área</option>
                  <option value="erp">ERP / Sistemas Empresariais</option>
                  <option value="rh">Recursos Humanos</option>
                  <option value="beneficios">Benefícios Corporativos</option>
                  <option value="recrutamento">Recrutamento e Seleção</option>
                  <option value="folha">Folha de Pagamento</option>
                  <option value="ponto">Controle de Ponto</option>
                  <option value="saude">Saúde Ocupacional</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Como podemos trabalhar juntos?</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="3"
                  placeholder="Conte-nos brevemente sobre sua empresa e como podemos criar uma parceria..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  <span>Enviar Solicitação</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Parceiros 