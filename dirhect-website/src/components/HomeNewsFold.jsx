import './HomeNewsFold.css'

const HomeNewsFold = () => {
  return (
    <section className="home-news-fold" id="novidades" aria-labelledby="news-title">
      <div className="home-news-container">
        <div className="home-news-content">
          <span className="home-news-tag">Destaques</span>
          <h2 id="news-title" className="home-news-title">
            Fique por dentro das <span className="gradient-text">Novidades</span>
          </h2>
          
          <div className="home-news-text">
            <p className="home-news-lead">
              O Web Summit Rio 2026 chegou ao fim, mas os aprendizados, conexões e oportunidades continuam impulsionando o futuro da Dirhect.
            </p>
            <p>
              Foram dias de troca de experiências, novas perspectivas e conexões valiosas que reforçaram nossa crença de que a transformação acontece quando tecnologia, pessoas e propósito caminham juntos.
            </p>
            <p className="home-news-highlight">
              🚀 O Web Summit foi um grande passo na trajetória da Dirhect — e estamos apenas começando.
            </p>
          </div>
        </div>

        <div className="home-news-image-wrap">
          <img 
            src="/images/web_summit_2026.png" 
            alt="Estande da Dirhect no Web Summit Rio 2026" 
            className="home-news-image"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeNewsFold
