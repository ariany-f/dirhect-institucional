import { useState, useEffect } from 'react'
import { CheckCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import './Integrations.css'

const Integrations = () => {
  const [expandedCards, setExpandedCards] = useState({})
  const [cardsPerView, setCardsPerView] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Atualizar quantidade de cards visíveis dinamicamente conforme a largura da janela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1)
      } else if (window.innerWidth <= 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleCard = (name) => {
    setExpandedCards((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const integrations = [
    {
      name: 'SAP',
      logo: '/images/logos/sap-logo.webp',
      description: 'Integração completa com módulos SAP HCM para sincronização de dados de funcionários, estrutura organizacional e folha de pagamento.',
      features: [
        'Sincronização de dados em tempo real',
        'Importação automática de funcionários',
        'Estrutura organizacional unificada',
        'Dados de folha de pagamento'
      ],
      color: '#0FAAFF',
      gradient: 'linear-gradient(135deg, #0FAAFF 0%, #003366 100%)'
    },
    {
      name: 'TOTVS',
      logo: '/images/logos/totvs-logo.png',
      description: 'Conexão direta com TOTVS para gestão integrada de recursos humanos, benefícios e controle de ponto.',
      features: [
        'Gestão de recursos humanos',
        'Controle de benefícios',
        'Integração com ponto eletrônico',
        'Relatórios unificados'
      ],
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #CC2E00 100%)'
    },
    {
      name: 'Closecare',
      logo: '/images/logos/closecare-logo.webp',
      description: 'Integração completa com a plataforma Closecare para gestão de benefícios corporativos e saúde ocupacional.',
      features: [
        'Gestão de Benefícios',
        'Saúde Ocupacional',
        'Validação de Atestados',
        'Relatórios Integrados'
      ],
      color: '#00A651',
      gradient: 'linear-gradient(135deg, #00A651 0%, #004d20 100%)'
    },
    {
      name: 'LG Sistemas',
      logo: '/images/logos/lgsistemas-logo.png',
      description: 'Integração com LG Sistemas para gestão completa de recursos humanos e processos empresariais.',
      features: [
        'LG RH',
        'LG Folha',
        'LG Ponto',
        'LG Benefícios'
      ],
      color: '#1E40AF',
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #0F205F 100%)'
    },
    {
      name: 'Pandapé',
      logo: '/images/logos/pandape-logo.svg',
      description: 'Integração com a plataforma Pandapé para otimizar processos de recrutamento e seleção.',
      features: [
        'Gestão de Vagas',
        'Triagem de Candidatos',
        'Acompanhamento de Processos',
        'Relatórios de R&S'
      ],
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #9E1F00 100%)'
    },
    {
      name: 'Gupy',
      logo: '/images/logos/gupy-logo.png',
      description: 'Integração completa com a Gupy para gestão de talentos e processos seletivos.',
      features: [
        'ATS (Applicant Tracking System)',
        'Gestão de Candidatos',
        'Avaliações Online',
        'Onboarding Digital'
      ],
      color: '#00A651',
      gradient: 'linear-gradient(135deg, #00E676 0%, #007934 100%)'
    },
    {
      name: 'Nexti RH Inteligente',
      logo: '/images/logos/nexti-logo.png',
      description: 'Integração com a Nexti RH Inteligente para automação e otimização de processos de recursos humanos.',
      features: [
        'Automação de Processos',
        'Gestão de Documentos',
        'Workflow Inteligente',
        'Analytics de RH'
      ],
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)'
    }
  ]

  const maxIndex = Math.max(0, integrations.length - cardsPerView)

  // Resetar índice quando a quantidade de cards por view muda para evitar posições vazias
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  // Lógica de deslizar para dispositivos touch
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrev()
    }
  }

  return (
    <section className="integrations-section" id="integrations">
      <div className="integrations-container">
        {/* Header */}
        <div className="integrations-header">
          <h2 className="integrations-title">
            Conecte com Seus <span className="gradient-text">Sistemas Existentes</span>
          </h2>
          <p className="integrations-subtitle">
            Integração nativa com os principais ERPs do mercado para uma gestão de RH verdadeiramente unificada
          </p>
        </div>

        {/* Integration Carousel */}
        <div className="integrations-carousel-wrapper">
          <button
            type="button"
            className="carousel-control prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="integrations-carousel-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="integrations-carousel-track"
              style={{
                transform: `translateX(calc(-1 * ${currentIndex} * (100% + var(--carousel-gap, 2.5rem)) / ${cardsPerView}))`,
                '--carousel-gap': '2.5rem',
                '--cards-per-view': cardsPerView,
              }}
            >
              {integrations.map((integration, index) => {
                const isExpanded = Boolean(expandedCards[integration.name])

                return (
                  <div
                    key={integration.name}
                    className="integration-card-wrap"
                    style={{
                      '--animation-delay': `${index * 0.1}s`,
                      flex: `0 0 calc((100% - (var(--cards-per-view) - 1) * var(--carousel-gap, 2.5rem)) / var(--cards-per-view))`,
                    }}
                  >
                    <h3 className="integration-name">{integration.name}</h3>

                    <div
                      className={`integration-card${isExpanded ? ' integration-card--expanded' : ''}`}
                      style={{
                        '--integration-color': integration.color,
                        '--integration-gradient': integration.gradient,
                      }}
                    >
                      <div className="integration-card-main">
                        <div className="integration-logo">
                          <img src={integration.logo} alt={`${integration.name} Logo`} />
                        </div>

                        <p className="integration-description">{integration.description}</p>
                      </div>

                      <button
                        type="button"
                        className="integration-ver-mais"
                        aria-expanded={isExpanded}
                        onClick={() => toggleCard(integration.name)}
                      >
                        <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronDown className="integration-ver-mais-icon" size={16} aria-hidden="true" />
                      </button>

                      <div className={`integration-accordion${isExpanded ? ' is-open' : ''}`}>
                        <div className="integration-accordion-inner">
                          <div className="integration-features">
                            <h4>Funcionalidades</h4>
                            <ul>
                              {integration.features.map((feature, idx) => (
                                <li key={idx}>
                                  <CheckCircle className="w-4 h-4" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            className="carousel-control next"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        {maxIndex > 0 && (
          <div className="carousel-indicators">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot${idx === currentIndex ? ' active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Integrations