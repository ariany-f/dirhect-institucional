import { ArrowRight, Users, Zap, CheckCircle, Shield, Clock, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const [cnpj, setCnpj] = useState('')

  // Garantir que as animações funcionem corretamente
  useEffect(() => {
    // Scroll para o topo se necessário e reiniciar animações
    window.scrollTo(0, 0)
    
    // Garantir que as animações CSS sejam aplicadas corretamente
    const elements = document.querySelectorAll('.hero, .hero-main-content, .hero-cta-section')
    elements.forEach(element => {
      element.style.animationPlayState = 'paused'
      // Força um reflow
      element.offsetHeight
      element.style.animationPlayState = 'running'
    })
  }, [])

  // Função para aplicar máscara de CNPJ
  const formatCNPJ = (value) => {
    // Remove tudo que não é número
    const cleanValue = value.replace(/\D/g, '')
    
    // Aplica a máscara: XX.XXX.XXX/XXXX-XX
    if (cleanValue.length <= 2) {
      return cleanValue
    } else if (cleanValue.length <= 5) {
      return cleanValue.replace(/(\d{2})(\d{0,3})/, '$1.$2')
    } else if (cleanValue.length <= 8) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
    } else if (cleanValue.length <= 12) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4')
    } else {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5')
    }
  }

  const handleCNPJChange = (e) => {
    const formattedValue = formatCNPJ(e.target.value)
    setCnpj(formattedValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Remove a formatação antes de enviar
    const cleanCNPJ = cnpj.replace(/\D/g, '')
    window.location.href = `/demo?cnpj=${cleanCNPJ}`
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-container">
        <div className="hero-layout">
          {/* Seção principal à esquerda */}
          <div className="hero-main-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Uma plataforma que faz <span className="gradient-text">mais pelo seu RH</span>
              </h1>
              
              <p className="hero-subtitle">
                Traduz. Integra. Simplifica.
              </p>
              
              <p className="hero-description">
                Conecte sua equipe de RH aos fornecedores e sistemas em uma única plataforma. 
                Reduza erros, economize tempo e foque no que realmente importa.
              </p>
            </div>
          </div>

          {/* Seção do CNPJ na inferior direita */}
          <div className="hero-cta-section">
            <div className="hero-cta-card">
              <div className="hero-cta-content">
                <h3 className="hero-cta-title">Comece agora mesmo</h3>
                <p className="hero-cta-text">
                  Peça sua demonstração gratuita e veja como funciona
                </p>
                
                <form onSubmit={handleSubmit} className="hero-cta-form">
                  <div className="hero-input-container">
                    <input
                      type="text"
                      className="hero-input"
                      placeholder="Digite seu CNPJ (XX.XXX.XXX/XXXX-XX)"
                      value={cnpj}
                      onChange={handleCNPJChange}
                      maxLength="18"
                      inputMode="numeric"
                    />
                    <button type="submit" className="hero-cta-button">
                      Continuar
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 