import React, { useState } from 'react';
import { 
  Gift, 
  Users, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Rocket,
  CreditCard,
  Calendar,
  FileText,
  Smartphone,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Heart,
  Zap
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './GestaoBeneficios.css';
import Footer from '../components/Footer';

const GestaoBeneficios = () => {
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
        tipo: 'Gestão de Benefícios'
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
      <div className="gestao-success">
        <div className="container">
          <div className="gestao-success-content">
            <div className="gestao-success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Solicitação Enviada com Sucesso!</h1>
            <p>
              Obrigado pelo seu interesse em nossa solução de Gestão de Benefícios. 
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
            </p>
            <div className="gestao-success-info">
              <div className="gestao-info-item">
                <Clock size={20} />
                <span>Resposta em 24h</span>
              </div>
              <div className="gestao-info-item">
                <Users size={20} />
                <span>Demonstração personalizada</span>
              </div>
              <div className="gestao-info-item">
                <Gift size={20} />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gestao-beneficios-page">
      {/* Hero Section */}
      <section className="gestao-hero">
        <div className="gestao-hero-background">
          <img 
            src="/images/pilares/gestao-beneficios.jpg" 
            alt="Gestão de Benefícios" 
            className="gestao-hero-bg-image"
          />
        </div>
        <div className="container">
          <div className="gestao-hero-content">
            <div className="gestao-hero-text">
              <div className="gestao-professional-badge">
                <Gift size={16} />
                <span>Solução de Gestão de Benefícios</span>
              </div>
              <h1>
                Simplifique a <span className="gestao-gradient-text">gestão</span> de 
                benefícios com <span className="gestao-highlight">tecnologia avançada</span>
              </h1>
              <p>
                Centralize todos os benefícios da sua empresa em uma única plataforma. 
                Reduza custos, melhore a experiência dos colaboradores e aumente a retenção.
              </p>
              <div className="gestao-hero-stats">
                <div className="gestao-stat-item">
                  <Clock size={28} />
                  <strong>70%</strong>
                  <span>Menos tempo</span>
                </div>
                <div className="gestao-stat-item">
                  <Shield size={28} />
                  <strong>100%</strong>
                  <span>Segurança</span>
                </div>
                <div className="gestao-stat-item">
                  <TrendingUp size={28} />
                  <strong>+40%</strong>
                  <span>Satisfação</span>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('gestao-form').scrollIntoView({ behavior: 'smooth' })}
                className="gestao-cta-button"
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
      <section className="gestao-beneficios">
        <div className="container">
          <h2>Por que escolher nossa Gestão de Benefícios?</h2>
          <p className="gestao-subtitle">
            Transforme a forma como sua empresa gerencia benefícios com uma solução completa e integrada
          </p>
          <div className="gestao-beneficios-grid">
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <CreditCard size={32} />
              </div>
              <h3>Cartão Benefício Flexível</h3>
              <p>
                Cartão único para todos os benefícios: alimentação, refeição, transporte, 
                saúde e muito mais. Controle total e flexibilidade para o colaborador.
              </p>
            </div>
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <Smartphone size={32} />
              </div>
              <h3>App Mobile Completo</h3>
              <p>
                Aplicativo intuitivo para consulta de saldo, histórico de transações, 
                solicitação de benefícios e muito mais. Disponível 24/7.
              </p>
            </div>
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <Shield size={32} />
              </div>
              <h3>Segurança e Conformidade</h3>
              <p>
                Plataforma segura com criptografia avançada e total conformidade 
                com a legislação trabalhista e fiscal brasileira.
              </p>
            </div>
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <TrendingUp size={32} />
              </div>
              <h3>Relatórios Avançados</h3>
              <p>
                Dashboards em tempo real com métricas de utilização, custos, 
                satisfação e ROI dos benefícios oferecidos.
              </p>
            </div>
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <Users size={32} />
              </div>
              <h3>Gestão de Elegibilidade</h3>
              <p>
                Controle automático de elegibilidade por cargo, tempo de empresa, 
                performance e critérios personalizados da sua empresa.
              </p>
            </div>
            <div className="gestao-beneficio-item">
              <div className="gestao-beneficio-icon">
                <Zap size={32} />
              </div>
              <h3>Integração Total</h3>
              <p>
                Integração nativa com sistemas de RH, folha de pagamento, 
                bancos e fornecedores de benefícios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="gestao-como-funciona">
        <div className="container">
          <h2>Como funciona nossa solução</h2>
          <p className="gestao-subtitle">
            Processo simples e eficiente para implementar a gestão de benefícios
          </p>
          <div className="gestao-steps-grid">
            <div className="gestao-step-item">
              <div className="gestao-step-number">1</div>
              <div className="gestao-step-icon">
                <FileText size={32} />
              </div>
              <h3>Configuração Inicial</h3>
              <p>
                Nossa equipe configura a plataforma de acordo com os benefícios 
                e regras específicas da sua empresa.
              </p>
            </div>
            <div className="gestao-step-item">
              <div className="gestao-step-number">2</div>
              <div className="gestao-step-icon">
                <Users size={32} />
              </div>
              <h3>Migração dos Dados</h3>
              <p>
                Migramos todos os dados dos colaboradores e benefícios existentes 
                de forma segura e sem interrupções.
              </p>
            </div>
            <div className="gestao-step-item">
              <div className="gestao-step-number">3</div>
              <div className="gestao-step-icon">
                <Smartphone size={32} />
              </div>
              <h3>Treinamento e Lançamento</h3>
              <p>
                Treinamos sua equipe e colaboradores no uso da plataforma 
                antes do lançamento oficial.
              </p>
            </div>
            <div className="gestao-step-item">
              <div className="gestao-step-number">4</div>
              <div className="gestao-step-icon">
                <Award size={32} />
              </div>
              <h3>Suporte Contínuo</h3>
              <p>
                Oferecemos suporte técnico e consultoria contínua para 
                otimizar o uso da plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="gestao-recursos">
        <div className="container">
          <h2>Recursos da Plataforma</h2>
          <div className="gestao-recursos-grid">
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <CreditCard size={24} />
              </div>
              <h4>Cartão Benefício</h4>
              <p>Cartão único para múltiplos benefícios</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <Calendar size={24} />
              </div>
              <h4>Controle de Períodos</h4>
              <p>Gestão automática de validades</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <DollarSign size={24} />
              </div>
              <h4>Controle de Limites</h4>
              <p>Definição de valores por benefício</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <Users size={24} />
              </div>
              <h4>Gestão de Grupos</h4>
              <p>Elegibilidade por categoria</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <TrendingUp size={24} />
              </div>
              <h4>Relatórios</h4>
              <p>Dashboards e análises</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <Shield size={24} />
              </div>
              <h4>Segurança</h4>
              <p>Criptografia e auditoria</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <Smartphone size={24} />
              </div>
              <h4>App Mobile</h4>
              <p>Acesso 24/7 via smartphone</p>
            </div>
            <div className="gestao-recurso-item">
              <div className="gestao-recurso-icon">
                <Heart size={24} />
              </div>
              <h4>Suporte</h4>
              <p>Atendimento especializado</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gestao-cta">
        <div className="container">
          <div className="gestao-cta-content">
            <h2>Pronto para revolucionar a gestão de benefícios?</h2>
            <p>
              Junte-se a centenas de empresas que já transformaram a experiência 
              de benefícios com nossa plataforma.
            </p>
            <button 
              onClick={() => document.getElementById('gestao-form').scrollIntoView({ behavior: 'smooth' })}
              className="gestao-cta-btn"
            >
              <Rocket size={20} />
              Solicitar Demonstração
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="gestao-formulario-section" id="gestao-form">
        <div className="container">
          <div className="gestao-form-content">
            <div className="gestao-form-header">
              <h2>Solicite sua Demonstração</h2>
              <p>
                Descubra como nossa solução pode transformar a gestão de benefícios da sua empresa. 
                Preencha o formulário e nossa equipe entrará em contato.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="gestao-form">
              {error && <div className="gestao-error-message">{error}</div>}
              <div className="gestao-form-grid">
                <div className="gestao-form-group">
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
                <div className="gestao-form-group">
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
                <div className="gestao-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="gestao-form-group">
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
                <div className="gestao-form-group">
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
                <div className="gestao-form-group gestao-form-group-full">
                  <label htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre seus desafios atuais com gestão de benefícios..."
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="gestao-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="gestao-submit-spinner"></div>
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

export default GestaoBeneficios; 