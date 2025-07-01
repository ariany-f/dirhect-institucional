import { useState, useEffect, useRef } from 'react'
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  Download, 
  Star, 
  Users, 
  Shield,
  Zap,
  CheckCircle 
} from 'lucide-react'
import './AppFeatures.css'

const AppFeatures = () => {
  const [activeView, setActiveView] = useState('mobile')
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

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Performance',
      description: 'Aplicativo otimizado para máxima velocidade',
      stats: '99.9%',
      label: 'Uptime'
    },
    {
      icon: <Shield size={24} />,
      title: 'Segurança',
      description: 'Proteção avançada dos seus dados',
      stats: '256-bit',
      label: 'Encryption'
    },
    {
      icon: <Users size={24} />,
      title: 'Usuários Ativos',
      description: 'Milhares de empresas confiam em nós',
      stats: '50k+',
      label: 'Empresas'
    }
  ]

  const appStats = [
    { value: '4.9', label: 'Avaliação', icon: <Star size={16} /> },
    { value: '100k+', label: 'Downloads', icon: <Download size={16} /> },
    { value: '99%', label: 'Satisfação', icon: <CheckCircle size={16} /> }
  ]

  return (
    <section ref={sectionRef} className={`app-features ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="features-content">
          <div className="features-header">
            <div className="features-badge">
              <span>📱 Aplicativo Mobile</span>
            </div>
            <h2 className="features-title">
              Tenha o poder do RH <span className="gradient-text">na palma da mão</span>
            </h2>
            <p className="features-subtitle">
              Nosso aplicativo mobile oferece todas as funcionalidades essenciais 
              para gestão de RH, permitindo que você trabalhe de qualquer lugar com 
              máxima eficiência e segurança.
            </p>
          </div>

          <div className="device-selector">
            <button 
              className={`device-btn ${activeView === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveView('mobile')}
            >
              <Smartphone size={20} />
              <span>Mobile</span>
            </button>
            <button 
              className={`device-btn ${activeView === 'tablet' ? 'active' : ''}`}
              onClick={() => setActiveView('tablet')}
            >
              <Tablet size={20} />
              <span>Tablet</span>
            </button>
            <button 
              className={`device-btn ${activeView === 'desktop' ? 'active' : ''}`}
              onClick={() => setActiveView('desktop')}
            >
              <Monitor size={20} />
              <span>Desktop</span>
            </button>
          </div>

          <div className="app-showcase">
            <div className={`device-mockup ${activeView}`}>
              <div className="device-frame">
                <div className="device-screen">
                  <div className="app-interface">
                    <div className="loading-skeleton">
                      <div className="skeleton-header">
                        <div className="skeleton-line short"></div>
                        <div className="skeleton-circle"></div>
                      </div>
                      <div className="skeleton-content">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line medium"></div>
                        <div className="skeleton-line short"></div>
                      </div>
                      <div className="skeleton-cards">
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                        <div className="skeleton-card"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="app-features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card"
                  style={{ '--delay': `${1.2 + (index * 0.2)}s` }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                    <div className="feature-stats">
                      <span className="stats-value">{feature.stats}</span>
                      <span className="stats-label">{feature.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="app-stats">
            <h3>Por que escolher nosso app?</h3>
            <div className="stats-grid">
              {appStats.map((stat, index) => (
                <div 
                  key={index}
                  className="stat-item"
                  style={{ '--delay': `${1.8 + (index * 0.1)}s` }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="download-section">
            <h3>Baixe agora e transforme seu RH</h3>
            <p>Disponível para todas as plataformas</p>
            <div className="download-buttons">
              <button className="download-btn primary">
                <Download size={20} />
                <span>Download App</span>
              </button>
              <button className="download-btn secondary">
                <Monitor size={20} />
                <span>Acessar Web</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppFeatures 