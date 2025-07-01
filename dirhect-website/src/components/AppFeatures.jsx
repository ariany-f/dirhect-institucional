import { useState, useEffect, useRef } from 'react'
import { 
  Monitor, 
  Users, 
  BarChart3,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import './AppFeatures.css'

const AppFeatures = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
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

  // Auto-slide functionality para os demos
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % appDemos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const appDemos = [
    {
      id: 'atividades-dashboard',
      title: 'Atividades',
      description: 'Gerenciamento completo de tarefas e processos de RH',
      image: '/images/showcase/atividades-dashboard.png'
    },
    {
      id: 'contratos-beneficios',
      title: 'Contratos',
      description: 'Gestão de contratos e benefícios corporativos',
      image: '/images/showcase/contratos-beneficios.png'
    },
    {
      id: 'elegibilidade-grupos',
      title: 'Elegibilidade',
      description: 'Configuração de grupos elegíveis para benefícios',
      image: '/images/showcase/elegibilidade-grupos.png'
    },
    {
      id: 'ferias-calendario',
      title: 'Férias',
      description: 'Calendário inteligente para gestão de férias',
      image: '/images/showcase/ferias-calendario.png'
    }
  ]

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % appDemos.length)
    setIsAutoPlaying(false)
  }

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + appDemos.length) % appDemos.length)
    setIsAutoPlaying(false)
  }

  const selectDemo = (index) => {
    setCurrentDemo(index)
    setIsAutoPlaying(false)
  }

  return (
    <section ref={sectionRef} className={`app-features ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="features-content">
          <div className="features-header">
            <div className="features-badge">
              <Monitor size={16} />
              <span>Plataforma Desktop</span>
            </div>
            <h2 className="features-title">
              Tenha o controle total do seu RH <span className="gradient-text">em uma plataforma completa</span>
            </h2>
            <p className="features-subtitle">
              Nossa plataforma desktop oferece todas as funcionalidades essenciais 
              para gestão de RH, com interface intuitiva e recursos avançados 
              para máxima produtividade.
            </p>
          </div>

          <div className="app-showcase">
            <div className="desktop-mockup">
              <div className="desktop-frame">
                <div className="desktop-screen">
                  <div className="desktop-interface">
                    <div className="desktop-screen-content">
                      <img 
                        src={appDemos[currentDemo].image}
                        alt={appDemos[currentDemo].title}
                        className="demo-screenshot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="app-info">
              <h4>{appDemos[currentDemo]?.title}</h4>
              <p>{appDemos[currentDemo]?.description}</p>
              
              <div className="demo-navigation">
                {appDemos.map((demo, index) => (
                  <button
                    key={demo.id}
                    className={`nav-indicator ${index === currentDemo ? 'active' : ''}`}
                    onClick={() => selectDemo(index)}
                  >
                    <span className="indicator-number">{index + 1}</span>
                    <span className="indicator-title">{demo.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="app-features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Monitor size={28} />
              </div>
              <div className="feature-content">
                <h4>Interface Profissional</h4>
                <p>Design moderno e intuitivo otimizado para produtividade máxima no ambiente corporativo</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={28} />
              </div>
              <div className="feature-content">
                <h4>Gestão Completa</h4>
                <p>Todas as funcionalidades de RH integradas em uma única plataforma poderosa</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={28} />
              </div>
              <div className="feature-content">
                <h4>Analytics Avançado</h4>
                <p>Relatórios detalhados e métricas em tempo real para decisões estratégicas inteligentes</p>
              </div>
            </div>
          </div>

          <div className="demo-cta-section">
            <div className="cta-content">
              <div className="cta-icon">
                <Play size={48} />
              </div>
              <h3>Veja o Dirhect em ação</h3>
              <p>
                Agende uma demonstração personalizada e descubra como nossa plataforma 
                pode transformar a gestão de RH da sua empresa.
              </p>
              <button className="demo-btn">
                <span>Agendar Demonstração</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppFeatures