import { Shield, Lock, Eye, CheckCircle2, FileCheck, Users, AlertTriangle } from 'lucide-react'
import './SecuritySection.css'

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <Shield size={24} />,
      title: 'Proteção de Dados',
      description: 'Criptografia de ponta a ponta para proteger informações sensíveis de RH'
    },
    {
      icon: <Lock size={24} />,
      title: 'Acesso Seguro',
      description: 'Autenticação multifator e controles de acesso granulares'
    },
    {
      icon: <Eye size={24} />,
      title: 'Auditoria Completa',
      description: 'Logs detalhados de todas as ações para conformidade e transparência'
    },
    {
      icon: <FileCheck size={24} />,
      title: 'LGPD Compliance',
      description: 'Totalmente adequado à Lei Geral de Proteção de Dados'
    }
  ]

  const supportChannels = [
    {
      title: 'Central de Ajuda',
      description: 'Documentação completa e tutoriais',
      icon: '📚'
    },
    {
      title: 'Suporte por Chat',
      description: 'Atendimento em tempo real',
      icon: '💬'
    },
    {
      title: 'Treinamento',
      description: 'Capacitação da sua equipe',
      icon: '🎓'
    },
    {
      title: 'Consultoria',
      description: 'Especialistas em implementação',
      icon: '👥'
    }
  ]

  return (
    <section className="security-section section">
      <div className="container">
        <div className="security-content">
          <div className="security-main">
            <div className="security-badge">
              <Shield size={20} />
              <span>Segurança é prioridade</span>
            </div>
            
            <h2>Protegemos seus dados com <span className="gradient-text">máxima segurança</span></h2>
            
            <p>
              Utilizamos as melhores práticas de segurança da indústria para garantir que os dados da sua empresa 
              e colaboradores estejam sempre protegidos. Nossa infraestrutura é auditada e certificada.
            </p>

            <div className="security-features">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="security-feature">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="security-certifications">
              <h4>Certificações e Conformidade</h4>
              <div className="cert-badges">
                <div className="cert-badge">
                  <span>ISO 27001</span>
                </div>
                <div className="cert-badge">
                  <span>LGPD</span>
                </div>
                <div className="cert-badge">
                  <span>SOC 2</span>
                </div>
                <div className="cert-badge">
                  <span>HTTPS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="support-section">
            <h3>Estamos aqui para ajudar</h3>
            <p>Suporte completo para garantir o sucesso da sua implementação</p>
            
            <div className="support-grid">
              {supportChannels.map((channel, index) => (
                <div key={index} className="support-card">
                  <div className="support-icon">
                    {channel.icon}
                  </div>
                  <h4>{channel.title}</h4>
                  <p>{channel.description}</p>
                </div>
              ))}
            </div>

            <div className="contact-info">
              <h4>Canais de Atendimento</h4>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <span className="contact-title">Telefone</span>
                    <span className="contact-value">(11) 9999-9999</span>
                    <span className="contact-hours">Seg-Sex: 8h às 18h</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <span className="contact-title">Email</span>
                    <span className="contact-value">suporte@dirhect.com</span>
                    <span className="contact-hours">Resposta em até 2h</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">🚨</div>
                  <div className="contact-details">
                    <span className="contact-title">Emergência</span>
                    <span className="contact-value">24/7 Support</span>
                    <span className="contact-hours">Para clientes Enterprise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecuritySection 