import { ArrowRight, BarChart3, Monitor, Play, Users } from 'lucide-react'
import './HomeAppFeaturesCardsFold.css'

const CARDS = [
  {
    id: 'interface',
    Icon: Monitor,
    title: 'Interface Profissional',
    description:
      'Design moderno e intuitivo otimizado para produtividade máxima no ambiente corporativo',
  },
  {
    id: 'gestao',
    Icon: Users,
    title: 'Gestão Completa',
    description: 'Todas as funcionalidades de RH integradas em uma única plataforma poderosa',
  },
  {
    id: 'analytics',
    Icon: BarChart3,
    title: 'Analytics Avançado',
    description:
      'Relatórios detalhados e métricas em tempo real para decisões estratégicas inteligentes',
  },
]

const HomeAppFeaturesCardsFold = () => {
  return (
    <section className="home-app-features-cards-fold" aria-label="Destaques da plataforma desktop">
      <div className="home-app-features-cards-fold-container home-fold-container">
        <div className="home-app-features-cards-grid">
          {CARDS.map(({ id, Icon, title, description }) => (
            <div key={id} className="home-app-features-card">
              <div className="home-app-features-card-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={2} />
              </div>
              <div className="home-app-features-card-content">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="home-app-features-cta">
          <div className="home-app-features-cta-content">
            <div className="home-app-features-cta-icon" aria-hidden="true">
              <Play size={32} />
            </div>
            <div className="home-app-features-cta-copy">
              <h3>Veja o Dirhect em ação</h3>
              <p>
                Agende uma demonstração e descubra como nossa plataforma pode transformar sua
                empresa.
              </p>
            </div>
            <button type="button" className="home-app-features-cta-btn">
              <span>Agendar Demonstração</span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAppFeaturesCardsFold
