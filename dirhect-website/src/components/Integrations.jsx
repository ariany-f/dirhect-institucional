import { Database, Zap, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Integrations.css'

const Integrations = () => {
  const navigate = useNavigate()

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

  const benefits = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Dados Unificados',
      description: 'Centralização de todas as informações de RH em uma única plataforma'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Sincronização Automática',
      description: 'Atualização em tempo real dos dados entre sistemas'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Experiência Única',
      description: 'Interface unificada para gestores e colaboradores'
    }
  ]

  return (
    <section className="integrations-section" id="integrations">
      <div className="integrations-container">
        {/* Header */}
        <div className="integrations-header">
          <div className="integrations-badge">
            <Database className="w-4 h-4" />
            <span>Integrações Empresariais</span>
          </div>
          <h2 className="integrations-title">
            Conecte com Seus <span className="gradient-text">Sistemas Existentes</span>
          </h2>
          <p className="integrations-subtitle">
            Integração nativa com os principais ERPs do mercado para uma gestão de RH verdadeiramente unificada
          </p>
        </div>

        {/* Integration Cards */}
        <div className="integrations-grid">
          {integrations.map((integration, index) => (
            <div 
              key={integration.name} 
              className="integration-card"
              style={{
                '--integration-color': integration.color,
                '--integration-gradient': integration.gradient,
                '--animation-delay': `${index * 0.2}s`
              }}
            >
              <div className="integration-card-header">
                <div className="integration-logo">
                  <img src={integration.logo} alt={`${integration.name} Logo`} />
                </div>
                <div className="integration-badge">
                  <CheckCircle className="w-4 h-4" />
                  <span>Integração Nativa</span>
                </div>
              </div>
              
              <div className="integration-card-content">
                <h3 className="integration-name">{integration.name}</h3>
                <p className="integration-description">{integration.description}</p>
                
                <div className="integration-features">
                  <h4>Funcionalidades:</h4>
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
          ))}
        </div>

        {/* Benefits Section */}
        <div className="integrations-benefits">
          <h3 className="benefits-title">Por que Integrar?</h3>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className=""
                style={{ '--animation-delay': `${(index + 2) * 0.1}s` }}
              >
                <div className="benefit-icon">
                  {benefit.icon}
                </div>
                <div>
                    <h4 className="benefit-title">{benefit.title}</h4>
                    <p className="benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="integrations-cta">
            <h3>Pronto para Integrar?</h3>
            <p>Nossa equipe técnica está pronta para configurar a integração com seu sistema atual</p>
            <div className="cta-buttons">
              <button className="cta-primary">
                <span>Agendar Demonstração</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                className="cta-secondary"
                onClick={() => navigate('/docs')}
              >
                <span>Documentação Técnica</span>
              </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Integrations 