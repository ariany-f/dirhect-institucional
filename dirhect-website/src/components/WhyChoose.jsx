import { Users, Building2, AlertTriangle } from 'lucide-react'
import './WhyChoose.css'

const WhyChoose = () => {
  return (
    <section className="why-choose section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Por que escolher <span className="gradient-text">o dirhect?</span></h2>
          <p>Porque ele une os dois lados</p>
        </div>

        <div className="why-content">
          <div className="sides-comparison">
            <div className="side-card">
              <div className="side-header">
                <Users size={32} />
                <h3>De um lado, sua equipe</h3>
              </div>
              <p>
                Que precisa atender prazos, garantir a qualidade e responder rapidamente às 
                demandas dos clientes.
              </p>
            </div>

            <div className="side-card">
              <div className="side-header">
                <Building2 size={32} />
                <h3>Do outro, fornecedores e sistemas</h3>
              </div>
              <p>
                Que exigem retrabalhos, redigitações e operações manuais, aumentando o risco 
                de erros e atrasos.
              </p>
            </div>
          </div>

          <div className="question-section">
            <div className="question-card">
              <p>
                Sua equipe está focada em gerar valor para o cliente ou presa em 
                retrabalhos e riscos operacionais causados pela falta de integração?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose 