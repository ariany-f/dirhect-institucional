import { useState, useEffect, useRef } from 'react'
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  CheckCircle, 
  AlertTriangle,
  Key,
  Database,
  Globe,
  Award,
  ArrowRight
} from 'lucide-react'
import './SecuritySection.css'

const SecuritySection = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const securityFeatures = [
    {
      icon: <Lock size={32} />,
      title: 'Autenticação Multifatorial (MFA)',
      description: 'Acesso seguro com múltiplas camadas de autenticação para proteger contas de usuários.',
      details: [
        'Autenticação via SMS e email',
        'Suporte a aplicativos autenticadores',
        'Login seguro em duas etapas'
      ]
    },
    {
      icon: <Database size={32} />,
      title: 'Bancos de Dados Isolados',
      description: 'Cada cliente possui um banco de dados completamente isolado, garantindo total privacidade.',
      details: [
        'Banco de dados dedicado por cliente',
        'Isolamento total entre empresas',
        'Performance otimizada por organização'
      ]
    },
    {
      icon: <Shield size={32} />,
      title: 'Criptografia Avançada',
      description: 'Todos os dados são protegidos com criptografia de nível militar AES-256.',
      details: [
        'Criptografia em trânsito e em repouso',
        'Chaves gerenciadas automaticamente',
        'Certificados SSL/TLS sempre atualizados'
      ]
    },
    {
      icon: <Eye size={32} />,
      title: 'Conformidade LGPD',
      description: 'Total conformidade com a Lei Geral de Proteção de Dados brasileira.',
      details: [
        'Controle total sobre dados pessoais',
        'Ferramentas para consentimento',
        'Processo de exclusão de dados'
      ]
    },
    {
      icon: <Key size={32} />,
      title: 'Log de Eventos Completo',
      description: 'Registro detalhado de todas as atividades para auditoria e segurança.',
      details: [
        'Rastreamento de todas as ações',
        'Logs de acesso e modificações',
        'Alertas de atividades suspeitas'
      ]
    }
  ]

  const certifications = [
    {
      icon: <Award size={24} />,
      title: 'ISO 27001',
      description: 'Certificação internacional de segurança da informação'
    },
    {
      icon: <Database size={24} />,
      title: 'LGPD Compliant',
      description: 'Total conformidade com a Lei Geral de Proteção de Dados'
    },
    {
      icon: <Globe size={24} />,
      title: 'SOC 2 Type II',
      description: 'Auditoria independente de controles de segurança'
    },
    {
      icon: <Key size={24} />,
      title: 'GDPR Ready',
      description: 'Preparado para regulamentações europeias'
    }
  ]

  const securityStats = [
    { value: '99.99%', label: 'Uptime Garantido' },
    { value: '0', label: 'Vazamentos de Dados' },
    { value: '<1s', label: 'Tempo de Detecção' },
    { value: '256-bit', label: 'Criptografia' }
  ]

  return (
    <section ref={sectionRef} className={`security-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="security-header">
          <div className="security-badge">
            <Shield size={16} />
            <span>Segurança Máxima</span>
          </div>
          <h2 className="security-title">
            Seus dados protegidos com <span className="gradient-text">segurança militar</span>
          </h2>
          <p className="security-subtitle">
            Implementamos os mais altos padrões de segurança da indústria para garantir 
            que suas informações sensíveis estejam sempre protegidas.
          </p>
        </div>

        <div className="security-features">
          <div className="features-list">
            {securityFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`feature-item ${activeFeature === index ? 'active' : ''}`}
                style={{ '--delay': `${1.0 + (index * 0.1)}s` }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-details">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="detail-item">
                        <CheckCircle size={16} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="security-visual">
            <div className="shield-container">
              <div className="shield-layers">
                <div className="layer layer-1"></div>
                <div className="layer layer-2"></div>
                <div className="layer layer-3"></div>
                <div className="shield-core">
                  <Shield size={60} />
                </div>
              </div>
              <div className="security-particles">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="particle"
                    style={{ 
                      '--delay': `${i * 0.5}s`,
                      '--rotation': `${i * 30}deg`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection 