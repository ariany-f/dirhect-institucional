import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowRight,
  User, 
  Users, 
  CheckSquare, 
  FileSpreadsheet, 
  GitBranch, 
  Cpu, 
  Heart 
} from 'lucide-react'
import DiagramaPlataforma from './DiagramaPlataforma'
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
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = (path) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      navigate(path)
    }, 600) // 600ms matches CSS transition duration
  }

  const solutionsList = [
    {
      id: 'admissao',
      title: 'Admissão Digital',
      link: '/admissao-digital',
      color: '#ff9202',
      icon: <User size={24} />,
      desc: 'Otimize a contratação de novos colaboradores de forma 100% digital.'
    },
    {
      id: 'portal',
      title: 'Portal de RH',
      link: '/portal-rh',
      color: '#feb503',
      icon: <Users size={24} />,
      desc: 'Centralize dados, comunicações e holerites em um portal corporativo seguro.'
    },
    {
      id: 'tarefas',
      title: 'Gestão de Tarefas',
      link: '/gestao-tarefas',
      color: '#a458fc',
      icon: <CheckSquare size={24} />,
      desc: 'Acompanhe as demandas da equipe com quadros interativos e prazos claros.'
    },
    {
      id: 'formularios',
      title: 'Formulários Customizados',
      link: '/formulario',
      color: '#17aaaa',
      icon: <FileSpreadsheet size={24} />,
      desc: 'Crie e configure formulários dinâmicos de acordo com a necessidade.'
    },
    {
      id: 'bpmn',
      title: 'Workflow BPMN',
      link: '/bpms',
      color: '#457cfd',
      icon: <GitBranch size={24} />,
      desc: 'Automatize e otimize seus fluxos operacionais com notação padrão BPMN.'
    },
    {
      id: 'integracao',
      title: 'Hub de Integração',
      link: '/ecossistema',
      color: '#4550fe',
      icon: <Cpu size={24} />,
      desc: 'Conecte seus sistemas existentes (ERP, CRM) com facilidade.'
    },
    {
      id: 'beneficios',
      title: 'Gestão de Benefícios',
      link: '/gestao-beneficios',
      color: '#27aa63',
      icon: <Heart size={24} />,
      desc: 'Gerencie planos de saúde, refeição e benefícios flexíveis num só lugar.'
    }
  ]

  return (
    <section 
      className={`home-solution-modules ${isTransitioning ? 'home-solution-modules--transitioning' : ''}`} 
      aria-labelledby="home-solution-modules-title"
    >
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
              <p className="home-solution-modules-tip-desktop">
                <strong>Dica:</strong> Clique em qualquer balão do diagrama ao lado para navegar e conhecer o respectivo módulo.
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

          {/* Interactive Radial Diagram (Desktop only) */}
          <div className="home-solution-modules-visual">
            <div className="home-solution-modules-diagram-container">
              <DiagramaPlataforma onNavigate={handleNavigate} />
            </div>
          </div>

        </div>

        {/* Mobile Stack Alternative (Visible on mobile instead of diagram) */}
        <div className="home-solution-modules-mobile-list">
          {solutionsList.map((sol) => (
            <div 
              key={sol.id} 
              className="home-modules-mobile-card" 
              onClick={() => handleNavigate(sol.link)} 
              style={{ '--card-accent-color': sol.color }}
            >
              <div className="home-modules-card-icon-wrapper" style={{ backgroundColor: `${sol.color}15`, color: sol.color }}>
                {sol.icon}
              </div>
              <div className="home-modules-card-content">
                <h3 className="home-modules-card-title">{sol.title}</h3>
                <p className="home-modules-card-desc">{sol.desc}</p>
              </div>
              <div className="home-modules-card-arrow" style={{ color: sol.color }}>
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HomeSolutionModulesFold
