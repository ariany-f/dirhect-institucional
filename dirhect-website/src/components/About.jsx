import './About.css'

const About = () => {
  return (
    <section id="sobre" className="about section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Sobre a <span className="gradient-text">Dirhect</span></h2>
          <p>Transformando a gestão de RH com tecnologia e inovação</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Nossa Missão</h3>
            <p>
              Simplificar e automatizar os processos de RH, conectando pessoas, 
              sistemas e fornecedores em uma plataforma única e inteligente.
            </p>
            
            <h3>Nossa Visão</h3>
            <p>
              Ser a principal plataforma de gestão de RH do Brasil, 
              revolucionando a forma como empresas gerenciam seus recursos humanos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 