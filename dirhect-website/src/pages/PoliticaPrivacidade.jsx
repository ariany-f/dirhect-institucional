import { Shield, Lock, Eye, UserCheck, FileText, AlertCircle } from 'lucide-react'
import './PoliticaPrivacidade.css'

const PoliticaPrivacidade = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <div className="privacy-hero-content">
          <div className="privacy-badge">
            <Shield size={16} />
            <span>Política de Privacidade</span>
          </div>
          <h1 className="privacy-title">
            Proteção e <span className="gradient-text">Privacidade</span> dos seus Dados
          </h1>
          <p className="privacy-subtitle">
            Entenda como coletamos, usamos e protegemos suas informações pessoais na plataforma Dirhect.
          </p>
          <div className="privacy-stats">
            <div className="privacy-stat">
              <div className="privacy-stat-number">100%</div>
              <div className="privacy-stat-label">Seguro</div>
            </div>
            <div className="privacy-stat">
              <div className="privacy-stat-number">LGPD</div>
              <div className="privacy-stat-label">Compatível</div>
            </div>
            <div className="privacy-stat">
              <div className="privacy-stat-number">24/7</div>
              <div className="privacy-stat-label">Monitoramento</div>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-main">
        <div className="privacy-container">
          <div className="privacy-content">
            <div className="privacy-updated">
              <AlertCircle size={16} />
              <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
            </div>

            <section className="privacy-section">
              <div className="section-header">
                <FileText className="section-icon" />
                <h2>1. Informações Gerais</h2>
              </div>
              <p>
                A Dirhect está comprometida em proteger sua privacidade e garantir a segurança dos seus dados pessoais. 
                Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações 
                quando você utiliza nossa plataforma de gestão de recursos humanos.
              </p>
              <p>
                Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política. Recomendamos que 
                você leia este documento com atenção e entre em contato conosco caso tenha dúvidas.
              </p>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <Eye className="section-icon" />
                <h2>2. Informações que Coletamos</h2>
              </div>
              <h3>2.1 Informações Pessoais</h3>
              <ul>
                <li>Nome completo, e-mail e telefone</li>
                <li>Dados profissionais (cargo, departamento, empresa)</li>
                <li>Documentos pessoais (CPF, RG, quando necessário)</li>
                <li>Informações bancárias para processamento de benefícios</li>
              </ul>
              
              <h3>2.2 Informações de Uso</h3>
              <ul>
                <li>Dados de navegação e uso da plataforma</li>
                <li>Endereço IP e informações do dispositivo</li>
                <li>Logs de acesso e atividades na plataforma</li>
                <li>Preferências e configurações do usuário</li>
              </ul>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <UserCheck className="section-icon" />
                <h2>3. Como Usamos suas Informações</h2>
              </div>
              <p>Utilizamos suas informações pessoais para:</p>
              <ul>
                <li>Fornecer e manter nossos serviços de RH</li>
                <li>Processar solicitações e gerenciar benefícios</li>
                <li>Comunicar sobre atualizações e mudanças no serviço</li>
                <li>Melhorar nossa plataforma e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              </ul>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <Lock className="section-icon" />
                <h2>4. Proteção e Segurança</h2>
              </div>
              <p>
                Implementamos medidas de segurança técnicas e administrativas adequadas para proteger suas informações:
              </p>
              <ul>
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controle de acesso baseado em funções</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e planos de recuperação</li>
                <li>Treinamento regular da equipe em segurança de dados</li>
              </ul>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <Shield className="section-icon" />
                <h2>5. Compartilhamento de Dados</h2>
              </div>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
              </p>
              <ul>
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
                <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
              </ul>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <UserCheck className="section-icon" />
                <h2>6. Seus Direitos (LGPD)</h2>
              </div>
              <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:</p>
              <ul>
                <li><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Exclusão:</strong> Solicitar a eliminação de dados pessoais</li>
                <li><strong>Portabilidade:</strong> Solicitar a transferência de dados para outro fornecedor</li>
                <li><strong>Revogação:</strong> Retirar o consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados pessoais</li>
              </ul>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <FileText className="section-icon" />
                <h2>7. Retenção de Dados</h2>
              </div>
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades 
                descritas nesta política ou conforme exigido por lei. Quando os dados não forem mais necessários, 
                eles serão excluídos ou anonimizados de forma segura.
              </p>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <AlertCircle className="section-icon" />
                <h2>8. Alterações nesta Política</h2>
              </div>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                mudanças significativas através da plataforma ou por e-mail. Recomendamos que você 
                revise esta política regularmente.
              </p>
            </section>

            <section className="privacy-section">
              <div className="section-header">
                <UserCheck className="section-icon" />
                <h2>9. Contato</h2>
              </div>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, 
                entre em contato conosco:
              </p>
              <div className="contact-info">
                <p><strong>E-mail:</strong> privacidade@dirhect.com</p>
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

export default PoliticaPrivacidade 