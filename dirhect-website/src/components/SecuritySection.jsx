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
  Award 
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
      icon: <Shield size={32} />,
      title: 'Criptografia de Ponta',
      description: 'Todos os dados são protegidos com criptografia AES-256, o padrão militar de segurança.',
      details: [
        'Criptografia em trânsito e em repouso',
        'Chaves gerenciadas automaticamente',
        'Certificados SSL/TLS atualizados',
        'Algoritmos aprovados pelo NIST'
      ]
    },
    {
      icon: <Lock size={32} />,
      title: 'Autenticação Multifatorial',
      description: 'Múltiplas camadas de autenticação garantem que apenas usuários autorizados acessem o sistema.',
      details: [
        'Autenticação via SMS e email',
        'Suporte a aplicativos autenticadores',
        'Biometria quando disponível',
        'Tokens de segurança físicos'
      ]
    },
    {
      icon: <Eye size={32} />,
      title: 'Monitoramento 24/7',
      description: 'Sistema de monitoramento contínuo identifica e responde a ameaças em tempo real.',
      details: [
        'Detecção de anomalias por IA',
        'Alertas automáticos de segurança',
        'Log completo de atividades',
        'Resposta automática a incidentes'
      ]
    },
    {
      icon: <Server size={32} />,
      title: 'Infraestrutura Segura',
      description: 'Hospedagem em data centers certificados com as mais altas classificações de segurança.',
      details: [
        'Data centers ISO 27001',
        'Backup automático e redundante',
        'Rede isolada e protegida',
        'Controle físico de acesso'
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
            <span>🔒 Segurança Máxima</span>
          </div>
          <h2 className="security-title">
            Seus dados protegidos com <span className="gradient-text">segurança militar</span>
          </h2>
          <p className="security-subtitle">
            Implementamos os mais altos padrões de segurança da indústria para garantir 
            que suas informações sensíveis estejam sempre protegidas.
          </p>
        </div>

        <div className="security-stats">
          {securityStats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item"
              style={{ '--delay': `${0.6 + (index * 0.1)}s` }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
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

        <div className="certifications-section">
          <h3>Certificações e Conformidade</h3>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="certification-card"
                style={{ '--delay': `${1.8 + (index * 0.1)}s` }}
              >
                <div className="cert-icon">
                  {cert.icon}
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="security-cta">
          <div className="cta-content">
            <AlertTriangle size={48} className="warning-icon" />
            <h3>Segurança não é opção, é obrigatório</h3>
            <p>
              Proteja sua empresa com a solução de RH mais segura do mercado. 
              Teste gratuitamente e veja como mantemos seus dados seguros.
            </p>
            <button className="security-btn">
              <Shield size={20} />
              <span>Teste a Segurança Agora</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection 