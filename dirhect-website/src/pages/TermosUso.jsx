import { FileText, Users, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react'
import './TermosUso.css'

const TermosUso = () => {
  return (
    <div className="terms-page">
      <div className="terms-hero">
        <div className="terms-hero-content">
          <div className="terms-badge">
            <FileText size={16} />
            <span>Termos de Uso</span>
          </div>
          <h1 className="terms-title">
            Termos e <span className="gradient-text">Condições</span> de Uso
          </h1>
          <p className="terms-subtitle">
            Conheça os termos e condições que regem o uso da plataforma Dirhect e nossos serviços.
          </p>
          <div className="terms-stats">
            <div className="terms-stat">
              <div className="terms-stat-number">100%</div>
              <div className="terms-stat-label">Transparente</div>
            </div>
            <div className="terms-stat">
              <div className="terms-stat-number">Legal</div>
              <div className="terms-stat-label">Conforme</div>
            </div>
            <div className="terms-stat">
              <div className="terms-stat-number">Justo</div>
              <div className="terms-stat-label">Para Todos</div>
            </div>
          </div>
        </div>
      </div>

      <div className="terms-main">
        <div className="terms-container">
          <div className="terms-content">
            <div className="terms-updated">
              <AlertTriangle size={16} />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>

            <section className="terms-section">
              <div className="section-header">
                <FileText className="section-icon" />
                <h2>1. Aceitação dos Termos</h2>
              </div>
              <p>
                Ao acessar e usar a plataforma Dirhect, você concorda em cumprir e estar vinculado a estes 
                Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
              <p>
                Estes termos constituem um acordo legal entre você e a Dirhect, estabelecendo as regras e 
                regulamentos para o uso de nossa plataforma de gestão de recursos humanos.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Users className="section-icon" />
                <h2>2. Definições</h2>
              </div>
              <ul>
                <li><strong>"Dirhect"</strong> - refere-se à nossa empresa e plataforma de gestão de RH</li>
                <li><strong>"Usuário"</strong> - qualquer pessoa que acesse ou use nossos serviços</li>
                <li><strong>"Plataforma"</strong> - nossa aplicação web e todos os serviços relacionados</li>
                <li><strong>"Conta"</strong> - a conta registrada do usuário em nossa plataforma</li>
                <li><strong>"Conteúdo"</strong> - qualquer informação, texto, dados ou arquivos na plataforma</li>
                <li><strong>"Serviços"</strong> - todas as funcionalidades oferecidas pela Dirhect</li>
              </ul>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <CheckCircle className="section-icon" />
                <h2>3. Uso da Plataforma</h2>
              </div>
              <h3>3.1 Licença de Uso</h3>
              <p>
                Concedemos a você uma licença limitada, não exclusiva e revogável para usar nossa plataforma 
                de acordo com estes termos.
              </p>
              
              <h3>3.2 Restrições de Uso</h3>
              <p>Você concorda em não:</p>
              <ul>
                <li>Usar a plataforma para fins ilegais ou não autorizados</li>
                <li>Tentar obter acesso não autorizado a sistemas ou dados</li>
                <li>Interferir no funcionamento normal da plataforma</li>
                <li>Copiar, modificar ou distribuir nosso software ou conteúdo</li>
                <li>Usar a plataforma para transmitir vírus ou códigos maliciosos</li>
                <li>Violar direitos de propriedade intelectual</li>
              </ul>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Shield className="section-icon" />
                <h2>4. Contas de Usuário</h2>
              </div>
              <h3>4.1 Registro</h3>
              <p>
                Para usar nossa plataforma, você deve criar uma conta fornecendo informações precisas e completas. 
                Você é responsável por manter a confidencialidade de suas credenciais de login.
              </p>
              
              <h3>4.2 Responsabilidades</h3>
              <ul>
                <li>Manter suas informações de conta atualizadas</li>
                <li>Proteger sua senha e credenciais de acesso</li>
                <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                <li>Usar a plataforma de forma responsável e ética</li>
              </ul>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <FileText className="section-icon" />
                <h2>5. Propriedade Intelectual</h2>
              </div>
              <p>
                Todos os direitos de propriedade intelectual da plataforma Dirhect, incluindo software, 
                design, conteúdo e marcas registradas, pertencem à Dirhect ou aos seus licenciadores.
              </p>
              <p>
                Você mantém a propriedade dos dados que carrega na plataforma, mas nos concede uma 
                licença para processá-los conforme necessário para fornecer nossos serviços.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <AlertTriangle className="section-icon" />
                <h2>6. Limitação de Responsabilidade</h2>
              </div>
              <p>
                A Dirhect não será responsável por quaisquer danos diretos, indiretos, incidentais, 
                especiais ou consequenciais decorrentes do uso ou incapacidade de usar nossa plataforma.
              </p>
              <p>
                Nossa responsabilidade total não excederá o valor pago por você pelos serviços nos 
                12 meses anteriores ao evento que deu origem à reclamação.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Scale className="section-icon" />
                <h2>7. Disponibilidade do Serviço</h2>
              </div>
              <p>
                Embora nos esforcemos para manter a plataforma disponível 24/7, não garantimos 
                disponibilidade contínua e ininterrupta dos serviços.
              </p>
              <ul>
                <li>Manutenções programadas serão comunicadas com antecedência</li>
                <li>Pode haver interrupções não planejadas por questões técnicas</li>
                <li>Nos reservamos o direito de modificar ou descontinuar serviços</li>
              </ul>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Users className="section-icon" />
                <h2>8. Conduta do Usuário</h2>
              </div>
              <p>Você concorda em:</p>
              <ul>
                <li>Usar a plataforma de forma ética e responsável</li>
                <li>Respeitar outros usuários e funcionários da Dirhect</li>
                <li>Não compartilhar conteúdo ofensivo ou inadequado</li>
                <li>Seguir as leis e regulamentos aplicáveis</li>
                <li>Relatar qualquer uso inadequado da plataforma</li>
              </ul>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <FileText className="section-icon" />
                <h2>9. Rescisão</h2>
              </div>
              <p>
                Qualquer uma das partes pode rescindir o uso da plataforma a qualquer momento. 
                Nos reservamos o direito de suspender ou encerrar contas que violem estes termos.
              </p>
              <p>
                Após a rescisão, seu direito de usar a plataforma cessará imediatamente, mas as 
                disposições que por natureza devem sobreviver continuarão em vigor.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Scale className="section-icon" />
                <h2>10. Lei Aplicável</h2>
              </div>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil. 
                Qualquer disputa será resolvida nos tribunais competentes de São Paulo, SP.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <AlertTriangle className="section-icon" />
                <h2>11. Alterações nos Termos</h2>
              </div>
              <p>
                Podemos modificar estes termos a qualquer momento. Alterações significativas serão 
                comunicadas através da plataforma ou por e-mail com pelo menos 30 dias de antecedência.
              </p>
              <p>
                O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="terms-section">
              <div className="section-header">
                <Users className="section-icon" />
                <h2>12. Contato</h2>
              </div>
              <p>
                Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="contact-info">
                <p><strong>E-mail:</strong> legal@dirhect.com</p>
                <p><strong>Telefone:</strong> (11) 9999-9999</p>
                <p><strong>Endereço:</strong> São Paulo, SP</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermosUso 