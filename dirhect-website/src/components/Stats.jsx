import { useState, useEffect, useRef } from 'react'
import { 
  Users, 
  Building2, 
  Clock, 
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import './Stats.css'

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({})
  const sectionRef = useRef(null)

  const stats = [
    {
      id: 1,
      icon: <Users size={32} />,
      value: 50000,
      suffix: '+',
      label: 'Colaboradores ativos',
      description: 'Pessoas utilizando nossa plataforma diariamente',
      color: '#3b82f6',
      prefix: ''
    },
    {
      id: 2,
      icon: <Building2 size={32} />,
      value: 200,
      suffix: '+',
      label: 'Clientes ativos',
      description: 'Empresas que confiam em nossa tecnologia',
      color: '#10b981',
      prefix: ''
    },
    {
      id: 3,
      icon: <Clock size={32} />,
      value: 90,
      suffix: '%',
      label: 'Redução de tempo',
      description: 'Economia média em processos de RH',
      color: '#8b5cf6',
      prefix: ''
    },
    {
      id: 4,
      icon: <TrendingUp size={32} />,
      value: 99.9,
      suffix: '%',
      label: 'Uptime garantido',
      description: 'Disponibilidade da plataforma 24/7',
      color: '#f59e0b',
      prefix: ''
    },
    {
      id: 5,
      icon: <Award size={32} />,
      value: 4.9,
      suffix: '/5.0',
      label: 'Satisfação do cliente',
      description: 'Avaliação média dos nossos usuários',
      color: '#ef4444',
      prefix: ''
    },
    {
      id: 6,
      icon: <Zap size={32} />,
      value: 5,
      suffix: 'seg',
      label: 'Tempo de resposta',
      description: 'Velocidade média de processamento',
      color: '#06b6d4',
      prefix: '<'
    }
  ]

  const animateValue = (start, end, duration, callback, hasDecimal = false) => {
    let startTime = null
    
    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = start + (end - start) * easeOutQuart
      
      callback(hasDecimal ? current.toFixed(1) : Math.floor(current))
      
      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          
          // Animar cada estatística com delay
          stats.forEach((stat, index) => {
            setTimeout(() => {
              const hasDecimal = stat.value % 1 !== 0
              animateValue(
                0, 
                stat.value, 
                2000, 
                (value) => {
                  setAnimatedValues(prev => ({
                    ...prev,
                    [stat.id]: value
                  }))
                },
                hasDecimal
              )
            }, index * 200)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className={`stats-section ${isVisible ? 'stats-section--visible' : ''}`}>
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-badge">
            <TrendingUp size={16} />
            <span>Resultados comprovados</span>
          </div>
          
          <h2 className="stats-title">
            Números que <span className="gradient-text">falam por si</span>
          </h2>
          
          <p className="stats-subtitle">
            Mais de 200 empresas já transformaram seus processos de RH com nossa tecnologia
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`stat-card stat-card--${index}`}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className="stat-card-background"></div>
              
              <div className="stat-card-icon" style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              
              <div className="stat-card-content">
                <div className="stat-value">
                  <span className="stat-prefix">{stat.prefix}</span>
                  <span className="stat-number">
                    {isVisible ? (animatedValues[stat.id] || 0) : 0}
                  </span>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-description">{stat.description}</p>
              </div>
              
              <div className="stat-card-glow" style={{ backgroundColor: stat.color }}></div>
            </div>
          ))}
        </div>

        <div className="stats-footer">
          <div className="stats-trust-badges">
            <div className="trust-badge">
              <div className="trust-badge-icon">🏆</div>
              <div className="trust-badge-text">
                <div className="trust-badge-title">Certificação ISO</div>
                <div className="trust-badge-subtitle">27001 - Segurança</div>
              </div>
            </div>
            
            <div className="trust-badge">
              <div className="trust-badge-icon">🛡️</div>
              <div className="trust-badge-text">
                <div className="trust-badge-title">LGPD Compliance</div>
                <div className="trust-badge-subtitle">100% Conformidade</div>
              </div>
            </div>
            
            <div className="trust-badge">
              <div className="trust-badge-icon">⭐</div>
              <div className="trust-badge-text">
                <div className="trust-badge-title">Suporte Premium</div>
                <div className="trust-badge-subtitle">24h por dia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats 