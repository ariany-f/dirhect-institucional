import { Layers, LayoutDashboard, Zap } from 'lucide-react'
import './HomeAboutFold.css'

const CARDS = [
  {
    id: 'complexidade',
    Icon: Layers,
    title: 'Menos complexidade.',
    description:
      'Centralize processos e reduza atividades manuais em uma única plataforma.',
  },
  {
    id: 'agilidade',
    Icon: Zap,
    title: 'Mais agilidade.',
    description: 'Automatize tarefas e elimine gargalos que atrasam a operação de RH.',
  },
  {
    id: 'controle',
    Icon: LayoutDashboard,
    title: 'Mais controle.',
    description: 'Informações organizadas, rastreáveis e acessíveis quando você precisar.',
  },
]

const HomeAboutFold = () => {
  return (
    <section className="home-about-fold" aria-label="Benefícios da plataforma Dirhect">
      <div className="home-about-fold-container home-fold-container">
        <div className="home-about-fold-principles-grid">
          {CARDS.map(({ id, Icon, title, description }) => (
            <div key={id} className="home-about-fold-principle-card">
              <div className="home-about-fold-card-head">
                <span className="home-about-fold-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h4>
                  <span className="home-about-fold-highlight">{title}</span>
                </h4>
              </div>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeAboutFold
