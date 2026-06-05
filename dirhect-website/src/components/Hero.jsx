import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const HERO_LOGOS = [
  { name: 'SAP', src: '/images/logos/sap-logo.webp' },
  { name: 'TOTVS', src: '/images/logos/totvs-logo.png' },
  { name: 'LG lugar de gente', src: '/images/logos/lgsistemas-logo.png' },
  { name: 'Gupy', src: '/images/logos/gupy-logo.png' },
  { name: 'Nexti', src: '/images/logos/nexti-logo.png' },
  { name: 'Closecare', src: '/images/logos/closecare-logo.webp' },
]

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section id="inicio" className="hero-home">
      <div className="hero-home-media" aria-hidden="true">
        <img
          className="hero-home-image"
          src="/images/home-hero-woman.png?v=20260601b"
          alt=""
          width={1200}
          height={800}
          decoding="async"
        />
        <div className="hero-home-media-fade" />
      </div>

      <div className="hero-home-container home-fold-container--asymmetric-right">
        <div className="hero-home-grid">
          <div className="hero-home-copy">
            <p className="hero-home-eyebrow">PLATAFORMA DE INTEGRAÇÃO PARA RH</p>
            <h1 className="hero-home-title">
              <span className="hero-home-title-line">
                <span className="hero-home-title-em">Muito mais</span>
                {' '}do que
              </span>
              <span className="hero-home-title-line hero-home-title-line--no-break">
                um software de RH
              </span>
            </h1>
            <p className="hero-home-description">
              Conecte operadoras, fornecedores, colaboradores e sistemas em uma única plataforma.
            </p>
            <div className="hero-home-actions">
              <Link to="/demo" className="hero-home-btn hero-home-btn--primary">
                Agendar demonstração
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>

            <div className="hero-home-partners-block">
              <p className="hero-home-partners-label">Conectado aos principais sistemas do mercado</p>
              <div className="hero-home-partners" aria-label="Parceiros e integrações">
                <ul className="hero-home-logos">
                  {HERO_LOGOS.map((logo) => (
                    <li key={logo.name}>
                      <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
