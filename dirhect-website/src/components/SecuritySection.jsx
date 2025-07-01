import { useState, useEffect, useRef } from 'react'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle, 
  Key
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
      icon: <Lock size={24} />,
      title: 'Autenticação Multifatorial',
      description: 'Acesso seguro com múltiplas camadas de autenticação.',
      details: [
        'Autenticação via SMS e email',
        'Suporte a apps autenticadores',
        'Login seguro em duas etapas'
      ]
    },
    {
      icon: <Database size={24} />,
      title: 'Bancos Isolados',
      description: 'Cada cliente possui um banco completamente isolado.',
      details: [
        'Banco dedicado por cliente',
        'Isolamento total entre empresas',
        'Performance otimizada'
      ]
    },
    {
      icon: <Shield size={24} />,
      title: 'Criptografia AES-256',
      description: 'Proteção com criptografia de nível militar.',
      details: [
        'Criptografia em trânsito e repouso',
        'Chaves gerenciadas automaticamente',
        'Certificados SSL/TLS atualizados'
      ]
    },
    {
      icon: <Eye size={24} />,
      title: 'Conformidade LGPD',
      description: 'Total conformidade com a LGPD brasileira.',
      details: [
        'Controle sobre dados pessoais',
        'Ferramentas para consentimento',
        'Processo de exclusão de dados'
      ]
    }
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
            Implementamos os mais altos padrões de segurança para garantir 
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
                        <CheckCircle size={14} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection 