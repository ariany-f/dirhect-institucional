import './HomeConnectorFold.css'

const HomeConnectorFold = () => {
  return (
    <section className="home-connector-fold" aria-label="Diferencial da plataforma Dirhect">
      <div className="home-connector-fold-container home-fold-container">
        <p className="home-connector-fold-text">
          Com o <span className="home-connector-fold-accent">Dirhect</span> você tem todas as
          informações em um só lugar
        </p>
        <span className="home-connector-fold-divider" aria-hidden="true">•</span>
        <p className="home-connector-fold-text">
          Independente do seu sistema de <span className="home-connector-fold-accent">RH</span> e <span className="home-connector-fold-accent">DP</span>
        </p>
      </div>
    </section>
  )
}

export default HomeConnectorFold
