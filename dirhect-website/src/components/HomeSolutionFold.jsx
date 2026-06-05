import './HomeSolutionFold.css'

const HomeSolutionFold = () => {
  return (
    <section className="home-solution-fold" aria-labelledby="home-solution-title">
      <div className="home-solution-fold-container home-fold-container">
        <p className="home-solution-fold-eyebrow">A SOLUÇÃO</p>
        <h2 id="home-solution-title" className="home-solution-fold-title">
          Conectando todo o ecossistema de RH, em uma{' '}
          <span className="home-solution-fold-accent">única plataforma</span>
        </h2>
        <p className="home-solution-fold-description">
          O Dirhect centraliza a comunicação entre RH, operadoras, corretoras, fornecedores, colaboradores e sistemas de gestão, eliminando retrabalho e processos manuais.
        </p>
      </div>
    </section>
  )
}

export default HomeSolutionFold
