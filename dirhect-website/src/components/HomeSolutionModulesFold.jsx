import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HomeSolutionModulesFold.css'

const PillCheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 10l2.5 2.5L14 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HomeSolutionModulesFold = () => {
  return (
    <section className="home-solution-modules" aria-labelledby="home-solution-modules-title">
      <div className="home-solution-modules-container home-fold-container">
        <div className="home-solution-modules-intro">
          <div className="home-solution-modules-top">
            <p className="home-solution-modules-eyebrow">Principais pilares da solução</p>
            <div className="home-solution-modules-copy">
              <h2 id="home-solution-modules-title" className="home-solution-modules-title">
                Stack de RH completo em <span className="home-solution-modules-accent">um só ambiente</span>
              </h2>
              <p className="home-solution-modules-sub">
                Sete módulos integrados — admissão, benefícios, portal, tarefas, formulários, workflows e integrações — em um único ambiente para RH, gestores e colaboradores.
              </p>
              <div className="home-solution-modules-pills" role="group" aria-label="Principais características">
                <span className="home-solution-modules-pill-ic" aria-hidden>
                  <PillCheckIcon />
                </span>
                <span>100% integrado</span>
                <span className="home-solution-modules-dot-pill" aria-hidden>
                  •
                </span>
                <span>Centralizado</span>
                <span className="home-solution-modules-dot-pill" aria-hidden>
                  •
                </span>
                <span>Seguro</span>
                <span className="home-solution-modules-dot-pill" aria-hidden>
                  •
                </span>
                <span>Escalável</span>
              </div>
              <Link to="/demo" className="home-solution-modules-link">
                Conhecer a plataforma
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="home-solution-modules-visual">
            <img
              className="home-solution-modules-diagram"
              src="/images/home-solution-modules-diagram.png?v=20260602b"
              alt="Diagrama dos sete módulos integrados da plataforma Dirhect"
              width={1536}
              height={1024}
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSolutionModulesFold
