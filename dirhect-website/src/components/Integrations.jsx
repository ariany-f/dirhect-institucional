import { useState } from 'react'
import { CheckCircle, ChevronDown } from 'lucide-react'
import './Integrations.css'

const Integrations = () => {
  const [expandedCards, setExpandedCards] = useState({})

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
      name: 'TOTVS RM',
      logo: '/images/logos/totvs-logo.png',
      description: 'Conexão direta com TOTVS RM para gestão integrada de recursos humanos, benefícios e controle de ponto.',
      features: [
        'Gestão de recursos humanos',
        'Controle de benefícios',
        'Integração com ponto eletrônico',
        'Relatórios unificados'
      ],
      color: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #CC2E00 100%)'
    }
  ]

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

        {/* Integration Cards */}
        <div className="integrations-grid">
          {integrations.map((integration, index) => {
            const isExpanded = Boolean(expandedCards[integration.name])

            return (
              <div
                key={integration.name}
                className="integration-card-wrap"
                style={{ '--animation-delay': `${index * 0.2}s` }}
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
    </section>
  )
}

export default Integrations 