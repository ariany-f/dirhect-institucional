import { useState, useEffect, useRef } from 'react'
import './AppFeatures.css'

const APP_DEMOS = [
  {
    id: 'atividades-dashboard',
    title: 'Atividades',
    description: 'Gerenciamento completo de tarefas e processos de RH',
    image: '/images/showcase/SITE - GESTAO TAREFAS.png',
  },
  {
    id: 'contratos-beneficios',
    title: 'Contratos',
    description: 'Gestão de contratos e benefícios corporativos',
    image: '/images/showcase/SITE - BENEFICIOS.png',
  },
  {
    id: 'elegibilidade-grupos',
    title: 'Elegibilidade',
    description: 'Configuração de grupos elegíveis para benefícios',
    image: '/images/showcase/SITE - BENEFICIOS.png',
  },
  {
    id: 'admissao-digital',
    title: 'Admissão\u00A0Digital',
    description: 'Criação de processos de admissão digital',
    image: '/images/showcase/SITE - PORTAL RH.png',
  },
]

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

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % APP_DEMOS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const selectDemo = (index) => {
    setCurrentDemo(index)
    setIsAutoPlaying(false)
  }

  return (
    <section ref={sectionRef} className={`app-features ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="features-content">
          <div className="features-header">
            <h2 className="features-title">
              Tenha o controle total do seu RH{' '}
              <span className="gradient-text">em uma plataforma completa</span>
            </h2>
            <p className="features-subtitle">
              Nossa plataforma desktop oferece todas as funcionalidades essenciais para gestão de RH,
              com interface intuitiva e recursos avançados para máxima produtividade.
            </p>
          </div>

          <div className="app-showcase">
            <div className="desktop-mockup">
              <div className="desktop-frame">
                <div className="desktop-screen">
                  <div className="desktop-interface">
                    <div className="desktop-screen-content">
                      <img
                        src={APP_DEMOS[currentDemo].image}
                        alt={APP_DEMOS[currentDemo].title}
                        className="demo-screenshot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="app-info">
              <h4>{APP_DEMOS[currentDemo]?.title}</h4>
              <p>{APP_DEMOS[currentDemo]?.description}</p>

              <div className="demo-navigation">
                {APP_DEMOS.map((demo, index) => (
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
        </div>
      </div>
    </section>
  )
}

export default AppFeatures
