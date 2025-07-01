import { useState, useEffect, useRef } from 'react'
import { 
  Zap, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  FileText,
  Database,
  Smartphone
} from 'lucide-react'
import './Features.css'

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const features = [
    {
      id: 1,
      icon: <Zap size={32} />,
      title: "Automação Inteligente",
      subtitle: "IA que simplifica processos",
      description: "Nossa inteligência artificial automatiza 90% dos processos manuais de RH, desde admissão até gestão de benefícios.",
      benefits: [
        "Redução de 90% no tempo de processamento",
        "Zero erros de digitação",
        "Integração automática com sistemas",
        "Validação em tempo real"
      ],
      color: "#3b82f6",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      icon: <Shield size={32} />,
      title: "Segurança Máxima",
      subtitle: "LGPD compliance garantida",
      description: "Proteção total dos dados com criptografia de ponta e conformidade completa com LGPD e normas internacionais.",
      benefits: [
        "Criptografia AES-256",
        "Auditoria completa de acessos",
        "Backup automático em nuvem",
        "Certificações internacionais"
      ],
      color: "#10b981",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      icon: <Users size={32} />,
      title: "Portal Unificado",
      subtitle: "Tudo em um só lugar",
      description: "Centralize toda comunicação, documentação e processos em uma plataforma única e intuitiva.",
      benefits: [
        "Interface única para todos",
        "Acesso mobile nativo",
        "Comunicação em tempo real",
        "Dashboard personalizado"
      ],
      color: "#8b5cf6",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 4,
      icon: <TrendingUp size={32} />,
      title: "Analytics Avançado",
      subtitle: "Insights que transformam",
      description: "Relatórios inteligentes e métricas em tempo real para decisões estratégicas baseadas em dados.",
      benefits: [
        "Dashboards em tempo real",
        "Relatórios automatizados",
        "Previsões com IA",
        "Métricas personalizadas"
      ],
      color: "#f59e0b",
      gradient: "from-orange-500 to-red-600"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className={`features-section ${isVisible ? 'features-section--visible' : ''}`}>
      <div className="features-container">
        <div className="features-header">
          <div className="features-badge">
            <Smartphone size={16} />
            <span>Tecnologia de ponta</span>
          </div>
          
          <h2 className="features-title">
            Uma plataforma que <span className="gradient-text">revoluciona</span> seu RH
          </h2>
          
          <p className="features-subtitle">
            Conecte, automatize e simplifique todos os seus processos em uma única solução inteligente
          </p>
        </div>

        <div className="features-grid">
          <div className="features-list">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className={`feature-card ${activeFeature === index ? 'feature-card--active' : ''}`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="feature-card-icon" style={{ background: feature.color }}>
                  {feature.icon}
                </div>
                
                <div className="feature-card-content">
                  <h3 className="feature-card-title">{feature.title}</h3>
                  <p className="feature-card-subtitle">{feature.subtitle}</p>
                  <p className="feature-card-description">{feature.description}</p>
                  
                  <div className="feature-benefits">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="feature-benefit">
                        <CheckCircle size={16} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="feature-card-arrow">
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>

          <div className="features-visual">
            <div className="feature-visual-card">
              <div className="feature-visual-header">
                <div className="feature-visual-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="feature-visual-title">Dirhect Platform</span>
              </div>
              
              <div className="feature-visual-content">
                <div className={`feature-visual-item feature-visual-item--${activeFeature}`}>
                  <div className="feature-visual-icon" style={{ background: features[activeFeature].color }}>
                    {features[activeFeature].icon}
                  </div>
                  
                  <div className="feature-visual-info">
                    <h4>{features[activeFeature].title}</h4>
                    <p>{features[activeFeature].subtitle}</p>
                    
                    <div className="feature-visual-stats">
                      <div className="feature-stat">
                        <div className="feature-stat-value">90%</div>
                        <div className="feature-stat-label">Redução de tempo</div>
                      </div>
                      <div className="feature-stat">
                        <div className="feature-stat-value">100%</div>
                        <div className="feature-stat-label">Precisão</div>
                      </div>
                      <div className="feature-stat">
                        <div className="feature-stat-value">24/7</div>
                        <div className="feature-stat-label">Disponibilidade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature-floating-elements">
              <div className="floating-element floating-element--1">
                <Database size={24} />
              </div>
              <div className="floating-element floating-element--2">
                <FileText size={24} />
              </div>
              <div className="floating-element floating-element--3">
                <Clock size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 