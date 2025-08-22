import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Rocket,
  Calendar,
  FileText,
  Smartphone,
  TrendingUp,
  Award,
  Zap,
  BarChart3,
  Shield,
  MessageSquare,
  Home,
  Settings,
  Bell,
  Search,
  Download
} from 'lucide-react';
import { sendDemoEmail } from '../services/emailService';
import './PortalRH.css';
import Footer from '../components/Footer';

const PortalRH = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    colaboradores: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await sendDemoEmail({
        ...formData,
        tipo: 'Portal RH'
      });
      setIsSuccess(true);
    } catch (err) {
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="portal-success">
        <div className="container">
          <div className="portal-success-content">
            <div className="portal-success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Solicitação Enviada com Sucesso!</h1>
            <p>
              Obrigado pelo seu interesse em nossa solução de Portal RH. 
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
            </p>
            <div className="portal-success-info">
              <div className="portal-info-item">
                <Clock size={20} />
                <span>Resposta em 24h</span>
              </div>
              <div className="portal-info-item">
                <Users size={20} />
                <span>Demonstração personalizada</span>
              </div>
              <div className="portal-info-item">
                <UserCheck size={20} />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portal-rh-page">
      {/* Hero Section */}
      <section className="portal-hero">
        <div className="portal-hero-background">
          <img 
            src="/images/pilares/portal-rh.jpg" 
            alt="Portal RH" 
            className="portal-hero-bg-image"
          />
        </div>
        <div className="container">
          <div className="portal-hero-content">
            <div className="portal-hero-text">
              <div className="portal-professional-badge">
                <Users size={16} />
                <span>Solução de Portal RH</span>
              </div>
              <h1>
                Transforme a experiência do colaborador com 
                um <span className="portal-highlight">portal RH completo</span>
              </h1>
              <p>
                Centralize todas as informações e processos de RH em uma plataforma moderna. 
                Melhore a experiência do colaborador e otimize a gestão de recursos humanos.
              </p>
              <div className="portal-hero-stats">
                <div className="portal-stat-item">
                  <UserCheck size={28} />
                  <strong>90%</strong>
                  <span>Satisfação</span>
                </div>
                <div className="portal-stat-item">
                  <Clock size={28} />
                  <strong>75%</strong>
                  <span>Menos tempo</span>
                </div>
                <div className="portal-stat-item">
                  <TrendingUp size={28} />
                  <strong>+50%</strong>
                  <span>Engajamento</span>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('portal-form').scrollIntoView({ behavior: 'smooth' })}
                className="portal-cta-button"
              >
                <Rocket size={20} />
                Solicitar Demonstração
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="portal-beneficios">
        <div className="container">
          <h2>Por que escolher nosso Portal RH?</h2>
          <p className="portal-subtitle">
            Transforme a forma como sua empresa gerencia recursos humanos com uma solução completa e moderna
          </p>
          <div className="portal-beneficios-grid">
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <Home size={32} />
              </div>
              <h3>Portal do Colaborador</h3>
              <p>
                Interface moderna e intuitiva onde o colaborador acessa todas as informações 
                pessoais, benefícios, documentos e solicitações de forma centralizada.
              </p>
            </div>
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <FileText size={32} />
              </div>
              <h3>Gestão Documental</h3>
              <p>
                Sistema completo de gestão de documentos com assinatura digital, 
                versionamento e controle de acesso seguro para todos os arquivos.
              </p>
            </div>
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <Calendar size={32} />
              </div>
              <h3>Gestão de Férias</h3>
              <p>
                Solicitação e aprovação de férias online, com calendário visual, 
                controle de saldo e integração com sistemas de folha de pagamento.
              </p>
            </div>
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <MessageSquare size={32} />
              </div>
              <h3>Comunicação Interna</h3>
              <p>
                Canal de comunicação direto entre RH e colaboradores, com notificações 
                push, chat interno e sistema de tickets para suporte.
              </p>
            </div>
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Relatórios e Analytics</h3>
              <p>
                Dashboards em tempo real com métricas de engajamento, satisfação, 
                turnover e indicadores de performance de RH.
              </p>
            </div>
            <div className="portal-beneficio-item">
              <div className="portal-beneficio-icon">
                <Zap size={32} />
              </div>
              <h3>Automação de Processos</h3>
              <p>
                Automatize workflows de RH como aprovações, notificações, 
                cálculos e integrações com outros sistemas da empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="portal-como-funciona">
        <div className="container">
          <h2>Como funciona nossa solução</h2>
          <p className="portal-subtitle">
            Processo simples e eficiente para implementar o Portal RH
          </p>
          <div className="portal-steps-grid">
            <div className="portal-step-item">
              <div className="portal-step-number">1</div>
              <div className="portal-step-icon">
                <Search size={32} />
              </div>
              <h3>Diagnóstico Inicial</h3>
              <p>
                Analisamos os processos atuais de RH da sua empresa para 
                identificar oportunidades de melhoria e automação.
              </p>
            </div>
            <div className="portal-step-item">
              <div className="portal-step-number">2</div>
              <div className="portal-step-icon">
                <Settings size={32} />
              </div>
              <h3>Configuração Personalizada</h3>
              <p>
                Configuramos o portal de acordo com as necessidades específicas 
                da sua empresa e estrutura organizacional.
              </p>
            </div>
            <div className="portal-step-item">
              <div className="portal-step-number">3</div>
              <div className="portal-step-icon">
                <Users size={32} />
              </div>
              <h3>Migração e Treinamento</h3>
              <p>
                Migramos os dados existentes e treinamos equipes de RH e 
                colaboradores no uso da nova plataforma.
              </p>
            </div>
            <div className="portal-step-item">
              <div className="portal-step-number">4</div>
              <div className="portal-step-icon">
                <Award size={32} />
              </div>
              <h3>Suporte e Evolução</h3>
              <p>
                Oferecemos suporte contínuo e evolução da plataforma para 
                acompanhar o crescimento da sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="portal-recursos">
        <div className="container">
          <h2>Recursos do Portal RH</h2>
          <div className="portal-recursos-grid">
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <Home size={24} />
              </div>
              <h4>Portal do Colaborador</h4>
              <p>Acesso centralizado a informações</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <FileText size={24} />
              </div>
              <h4>Documentos</h4>
              <p>Gestão documental completa</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <Calendar size={24} />
              </div>
              <h4>Férias e Ausências</h4>
              <p>Controle de tempo e ausências</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <MessageSquare size={24} />
              </div>
              <h4>Comunicação</h4>
              <p>Canal direto com RH</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <BarChart3 size={24} />
              </div>
              <h4>Relatórios</h4>
              <p>Analytics e métricas</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <Bell size={24} />
              </div>
              <h4>Notificações</h4>
              <p>Alertas e lembretes</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <Smartphone size={24} />
              </div>
              <h4>App Mobile</h4>
              <p>Acesso via smartphone</p>
            </div>
            <div className="portal-recurso-item">
              <div className="portal-recurso-icon">
                <Shield size={24} />
              </div>
              <h4>Segurança</h4>
              <p>Controle de acesso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="portal-cta">
        <div className="container">
          <div className="portal-cta-content">
            <h2>Pronto para revolucionar o Portal RH?</h2>
            <p>
              Junte-se a centenas de empresas que já transformaram a experiência 
              de RH com nossa plataforma moderna e completa.
            </p>
            <button 
              onClick={() => document.getElementById('portal-form').scrollIntoView({ behavior: 'smooth' })}
              className="portal-cta-btn"
            >
              <Rocket size={20} />
              Solicitar Demonstração
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="portal-formulario-section" id="portal-form">
        <div className="container">
          <div className="portal-form-content">
            <div className="portal-form-header">
              <h2>Solicite sua Demonstração</h2>
              <p>
                Descubra como nossa solução pode transformar o Portal RH da sua empresa. 
                Preencha o formulário e nossa equipe entrará em contato.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="portal-form">
              {error && <div className="portal-error-message">{error}</div>}
              <div className="portal-form-grid">
                <div className="portal-form-group">
                  <label htmlFor="nome">Nome Completo *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="portal-form-group">
                  <label htmlFor="email">E-mail Corporativo *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="seu.email@empresa.com"
                  />
                </div>
                <div className="portal-form-group">
                  <label htmlFor="telefone">Telefone *</label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="portal-form-group">
                  <label htmlFor="empresa">Empresa *</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="portal-form-group">
                  <label htmlFor="colaboradores">Número de Colaboradores *</label>
                  <select
                    id="colaboradores"
                    name="colaboradores"
                    value={formData.colaboradores}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="1-50">1 a 50 colaboradores</option>
                    <option value="51-200">51 a 200 colaboradores</option>
                    <option value="201-500">201 a 500 colaboradores</option>
                    <option value="501-1000">501 a 1.000 colaboradores</option>
                    <option value="1000+">Mais de 1.000 colaboradores</option>
                  </select>
                </div>
                <div className="portal-form-group portal-form-group-full">
                  <label htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre seus desafios atuais com Portal RH..."
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="portal-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="portal-submit-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Rocket size={20} />
                    Solicitar Demonstração
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PortalRH; 