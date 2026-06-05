import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HomePlatformFold.css'

const PLATFORM_FEATURES = [
  'Interface intuitiva',
  'Automação de ponta a ponta',
  'Dados centralizados e seguros',
  'Acesso web e mobile',
]

const HomePlatformFold = () => {
  return (
    <section className="home-platform-fold" aria-labelledby="home-platform-fold-title">
      <div className="home-platform-fold-inner home-fold-container">
        <div className="home-platform-fold-platform">
          <div className="home-platform-fold-platform-copy">
            <p className="home-platform-fold-eyebrow">PLATAFORMA COMPLETA</p>
            <h2 id="home-platform-fold-title" className="home-platform-fold-title">
              Tecnologia que simplifica e aproxima pessoas
            </h2>
            <ul className="home-platform-fold-features">
              {PLATFORM_FEATURES.map((item) => (
                <li key={item}>
                  <Check className="home-platform-fold-check" size={16} strokeWidth={2.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="home-platform-fold-laptop-wrap">
            <img
              className="home-platform-fold-laptop"
              src="/images/home-platform-fold-laptop.png?v=20260603"
              alt="Painel da plataforma Dirhect em notebook"
              width={922}
              height={1024}
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>

        <div className="home-platform-fold-app">
          <div className="home-platform-fold-app-copy">
            <h3 className="home-platform-fold-app-title">Área do Colaborador</h3>
            <p className="home-platform-fold-app-description">
              Autonomia para o colaborador acompanhar informações, benefícios e documentos na palma
              da mão.
            </p>
            <Link to="/area-colaborador" className="home-platform-fold-app-cta">
              Ver aplicativo
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
          <div className="home-platform-fold-phone-wrap">
            <img
              className="home-platform-fold-phone"
              src="/images/home-platform-fold-phone.png?v=20260602"
              alt="Aplicativo do colaborador Dirhect em smartphone"
              width={95}
              height={185}
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePlatformFold
