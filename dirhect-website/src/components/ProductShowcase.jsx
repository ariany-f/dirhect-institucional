import { useState, useEffect, useRef } from 'react'
import { 
  ChevronDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import './ProductShowcase.css'

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('desktop')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef(null)
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section ref={sectionRef} className={`product-showcase ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="showcase-content">
          <div className="showcase-header">
            <div className="showcase-badge">
              <span>📱 Multiplataforma</span>
            </div>
            <h2 className="showcase-title">
              Experimente nossa <span className="gradient-text">plataforma</span> em ação
            </h2>
            <p className="showcase-subtitle">
              Veja como nossa solução funciona perfeitamente em todos os dispositivos,
              oferecendo uma experiência consistente e intuitiva.
            </p>
          </div>

          <div className="device-tabs">
            <button 
              className={`device-tab ${activeTab === 'desktop' ? 'active' : ''}`}
              onClick={() => setActiveTab('desktop')}
            >
              <Monitor size={20} />
              <span>Desktop</span>
            </button>
            <button 
              className={`device-tab ${activeTab === 'tablet' ? 'active' : ''}`}
              onClick={() => setActiveTab('tablet')}
            >
              <Tablet size={20} />
              <span>Tablet</span>
            </button>
            <button 
              className={`device-tab ${activeTab === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              <Smartphone size={20} />
              <span>Mobile</span>
            </button>
          </div>

          <div className="showcase-demo">
            <div className={`demo-container ${activeTab}`}>
              <div className="demo-screen">
                <div className="screen-header">
                  <div className="screen-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <div className="screen-title">Dirhect - Sistema de RH</div>
                </div>
                
                <div className="screen-content">
                  <video 
                    ref={videoRef}
                    className="demo-video"
                    muted={isMuted}
                    loop
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src="/videos/demo.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos HTML5.
                  </video>
                  
                  <div className="video-overlay">
                    <div className="loading-demo">
                      <div className="loading-bars">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                      </div>
                      <span>Carregando demonstração...</span>
                    </div>
                  </div>
                </div>
                
                <div className="video-controls">
                  <button onClick={togglePlay} className="control-btn">
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
                  </button>
                  
                  <button onClick={restartVideo} className="control-btn">
                    <RotateCcw size={16} />
                    <span>Reiniciar</span>
                  </button>
                  
                  <button onClick={toggleMute} className="control-btn">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>{isMuted ? 'Som' : 'Mudo'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-features">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h4>Performance</h4>
              <p>Interface rápida e responsiva</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h4>Design Moderno</h4>
              <p>UX/UI intuitiva e elegante</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h4>Responsivo</h4>
              <p>Funciona em todos os dispositivos</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h4>Seguro</h4>
              <p>Proteção máxima dos dados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase 