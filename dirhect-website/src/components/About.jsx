import './About.css'

const About = () => {
  return (
    <section id="sobre" className="about section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Sobre <span className="gradient-text">Dirhect</span></h2>
          <p>Os valores que guiam nossa forma de desenvolver soluções</p>
        </div>
        
        <div className="about-content">
          <div className="principles-grid">
            <div className="principle-card">
              <h3><span className="highlight">Fácil de usar.</span> Intuitivo.</h3>
              <p>
                Interface pensada para ser simples e natural, permitindo que qualquer pessoa 
                use o sistema sem dificuldades ou treinamentos complexos.
              </p>
            </div>
            
            <div className="principle-card">
              <h3><span className="highlight">Simples implantação.</span> Sem burocracia de projeto.</h3>
              <p>
                Implementação rápida e descomplicada, sem processos burocráticos extensos 
                ou documentações desnecessárias que atrasam o início da operação.
              </p>
            </div>
            
            <div className="principle-card">
              <h3><span className="highlight">Que funcione.</span> Sem depender de nós ou da TI.</h3>
              <p>
                Sistema robusto e autônomo que opera de forma independente, 
                minimizando a necessidade de suporte técnico constante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 