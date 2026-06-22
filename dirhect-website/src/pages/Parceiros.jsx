import { useEffect, useState } from 'react'
import { 
  CheckCircle, 
  Star,
  ChevronDown
} from 'lucide-react'
import Header from '../components/Header.jsx?v=menu-nav-20260521'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import './Parceiros.css'

const Parceiros = () => {
  const [expandedCards, setExpandedCards] = useState({})

  const toggleCard = (name) => {
    setExpandedCards((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  // Rolar para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      name: 'Nexti',
      logo: '/images/logos/nexti-logo.png',
      category: 'Gestão de RH',
      description: 'Integração com a Nexti para automação e otimização de processos de recursos humanos.',
      features: ['Automação de Processos', 'Gestão de Documentos', 'Workflow Inteligente', 'Analytics de RH'],
      status: 'Gestão de RH',
      color: '#8B5CF6'
    }
  ]

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="partners-hero">
        <div className="container partners-hero-split">
          <div className="partners-hero-text-wrap">
            <h1>O Dirhect se conecta ao seu sistema, <span style={{ color: 'var(--primary-color)' }}>independentemente de qual seja.</span></h1>
            <p>Conheça algumas das empresas que já estão conosco revolucionando o RH</p>
          </div>
          <div className="partners-hero-image-wrap">
            <img src="/images/parceiros-conecta-sistema.png" alt="Ecossistema de integrações Dirhect" />
          </div>
        </div>
      </section>

      {/* Current Partners - Exemplos de sucesso */}
      <section className="current-partners-section" style={{ padding: '60px 0 100px' }}>
        <div className="container">

          <div className="partners-grid">
            {allPartners.map((partner, index) => {
              const isExpanded = Boolean(expandedCards[partner.name])
              
              return (
                <div 
                  key={partner.name} 
                  className={`partner-card ${isExpanded ? 'partner-card--expanded' : ''}`}
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
                    
                    <button
                      type="button"
                      className="partner-ver-mais"
                      aria-expanded={isExpanded}
                      onClick={() => toggleCard(partner.name)}
                    >
                      <span>{isExpanded ? 'Ver menos' : 'Ver mais'}</span>
                      <ChevronDown className="partner-ver-mais-icon" size={16} aria-hidden="true" />
                    </button>

                    <div className={`partner-accordion${isExpanded ? ' is-open' : ''}`}>
                      <div className="partner-accordion-inner">
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
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </div>
  )
}

export default Parceiros