import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  ArrowRight,
  User, 
  Users, 
  CheckSquare, 
  FileSpreadsheet, 
  GitBranch, 
  Cpu, 
  Heart 
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DiagramaPlataforma from '../components/DiagramaPlataforma'
import './SolucoesTeste.css'

const SolucoesTeste = () => {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      link: '/parceiros',
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
    <div className={`solucoes-teste-page ${isTransitioning ? 'solucoes-teste-page--transitioning' : ''}`}>
      <Header />
      <main className="solucoes-teste-main">
        <div className="solucoes-teste-container">
          
          {/* Hero Section with Split Layout */}
          <div className="solucoes-teste-hero">
            <div className="solucoes-teste-hero-flex">
              
              {/* Copy Side */}
              <div className="solucoes-teste-hero-content">
                <span className="badge-instrucao">👉 Clique em qualquer balão para navegar</span>
                <h1 className="solucoes-teste-title">
                  Soluções <span className="highlight">Dirhect</span>
                </h1>
                <p className="solucoes-teste-subtitle">
                  Explore o ecossistema integrado da plataforma Dirhect. <strong className="subtitle-highlight">Clique em qualquer balão</strong> do diagrama radial ao lado para navegar e conhecer cada detalhe do nosso ecossistema de soluções de RH.
                </p>
                <div className="solucoes-teste-hero-actions">
                  <Link to="/" className="btn-teste btn-teste--primary">
                    <ArrowLeft size={16} />
                    Voltar ao Início
                  </Link>
                </div>
              </div>

              {/* Diagram Side (Desktop only) */}
              <div className="solucoes-teste-diagram-wrapper">
                <DiagramaPlataforma onNavigate={handleNavigate} />
              </div>

            </div>
          </div>

          {/* Solutions Stack (Visible on Mobile / Fallback) */}
          <div className="solucoes-teste-mobile-section">
            <h2 className="mobile-section-title">Explore as Soluções</h2>
            <p className="mobile-section-subtitle">Toque em qualquer solução abaixo para acessar sua respectiva página:</p>
            <div className="mobile-solutions-container">
              {solutionsList.map((sol) => (
                <div 
                  key={sol.id} 
                  className="mobile-solucao-card" 
                  onClick={() => handleNavigate(sol.link)} 
                  style={{ '--card-accent-color': sol.color }}
                >
                  <div className="mobile-card-icon-wrapper" style={{ backgroundColor: `${sol.color}15`, color: sol.color }}>
                    {sol.icon}
                  </div>
                  <div className="mobile-card-content">
                    <h3 className="mobile-card-title">{sol.title}</h3>
                    <p className="mobile-card-desc">{sol.desc}</p>
                  </div>
                  <div className="mobile-card-arrow" style={{ color: sol.color }}>
                    <ArrowRight size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SolucoesTeste
