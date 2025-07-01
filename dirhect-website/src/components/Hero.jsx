import { ArrowRight, Users, Zap, CheckCircle, Shield, Clock, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const [cnpj, setCnpj] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Redirecionar para a página de demo com o CNPJ
    window.location.href = `/demo?cnpj=${cnpj}`
  }

  return (
    <section id="inicio" className="hero">
      <div className="hero-container">
        <div className="hero-layout">
          {/* Seção principal à esquerda */}
          <div className="hero-main-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Uma plataforma que faz <span className="gradient-text">mais por você</span>
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
                      placeholder="Digite seu CNPJ"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
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