import { Clock, ShieldCheck, TrendingUp } from 'lucide-react'
import { Fragment } from 'react'
import './HomeResultsFold.css'

const METRICS = [
  {
    id: 'hours',
    Icon: Clock,
    value: '40h',
    label: 'economizadas por mês',
  },
  {
    id: 'automation',
    Icon: TrendingUp,
    value: '98%',
    label: 'de processos automatizados',
  },
  {
    id: 'errors',
    Icon: ShieldCheck,
    value: '90%',
    labelLines: ['de redução em', 'erros operacionais'],
  },
]

const HomeResultsFold = () => {
  return (
    <section className="home-results-fold" aria-labelledby="home-results-fold-eyebrow">
      <div className="home-results-fold-shell">
        <div className="home-results-fold-main home-fold-container--asymmetric-right">
          <p id="home-results-fold-eyebrow" className="home-results-fold-eyebrow">
            RESULTADOS REAIS
          </p>

          <div className="home-results-fold-row">
            <div className="home-results-fold-metrics">
              {METRICS.map((metric, index) => (
                <Fragment key={metric.id}>
                  {index > 0 && <span className="home-results-fold-divider" aria-hidden="true" />}
                  <div className="home-results-fold-metric">
                    <metric.Icon className="home-results-fold-metric-icon" size={24} strokeWidth={1.75} />
                    <div className="home-results-fold-metric-copy">
                      <strong className="home-results-fold-metric-value">{metric.value}</strong>
                      {'labelLines' in metric ? (
                        <span className="home-results-fold-metric-label home-results-fold-metric-label--stacked">
                          {metric.labelLines.map((line) => (
                            <span key={line} className="home-results-fold-metric-label-line">
                              {line}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="home-results-fold-metric-label">{metric.label}</span>
                      )}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            <p className="home-results-fold-tagline">
              <span className="home-results-fold-tagline-line">Mais tempo para o que</span>
              <span className="home-results-fold-tagline-line">realmente importa: pessoas.</span>
            </p>
          </div>
        </div>
      </div>

      <div className="home-results-fold-portrait-wrap">
        <img
          className="home-results-fold-portrait"
          src="/images/home-results-fold-portrait.png?v=20260602c"
          alt="Profissional de RH sorrindo com os braços cruzados"
          width={1024}
          height={499}
          decoding="async"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default HomeResultsFold
