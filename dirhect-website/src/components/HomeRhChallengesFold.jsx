import { Clock, FileText, Link2 } from 'lucide-react'
import './HomeRhChallengesFold.css'

const CHALLENGES = [
  {
    id: 'processos',
    Icon: FileText,
    title: 'Processos espalhados',
    description:
      'Informações descentralizadas em planilhas e sistemas que dificultam a gestão.',
  },
  {
    id: 'sistemas',
    Icon: Link2,
    title: 'Sistemas não integrados',
    description:
      'ERP, operadoras e fornecedores trabalhando isolados geram retrabalho e inconsistências.',
  },
  {
    id: 'operacoes',
    Icon: Clock,
    title: 'Operações manuais',
    description:
      'Tarefas repetitivas que tomam tempo do RH e aumentam o risco de erros.',
  },
]

const HomeRhChallengesFold = () => {
  return (
    <section className="home-rh-challenges" aria-labelledby="home-rh-challenges-title">
      <div className="home-rh-challenges-body">
        <div className="home-rh-challenges-content home-fold-container--asymmetric-right">
          <header className="home-rh-challenges-header">
            <p className="home-rh-challenges-eyebrow">DESAFIOS DO RH</p>
            <h2 id="home-rh-challenges-title" className="home-rh-challenges-title">
              O RH já é complexo o suficiente
            </h2>
          </header>

          <ul className="home-rh-challenges-list">
            {CHALLENGES.map(({ id, Icon, title, description }) => (
              <li key={id} className="home-rh-challenges-item">
                <span className="home-rh-challenges-icon" aria-hidden="true">
                  <Icon size={32} strokeWidth={1.75} />
                </span>
                <div className="home-rh-challenges-item-copy">
                  <h3 className="home-rh-challenges-item-title">{title}</h3>
                  <p className="home-rh-challenges-item-text">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="home-rh-challenges-media">
          <img
            src="/images/home-rh-challenges-fold.png?v=20260602d"
            alt="Equipe de RH colaborando em torno de um notebook no escritório"
            width={1024}
            height={626}
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeRhChallengesFold
