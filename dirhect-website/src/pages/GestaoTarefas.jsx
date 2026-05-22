import React, { useState } from 'react';
import { 
  CheckSquare, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Rocket,
  Calendar,
  Target,
  FileText,
  Smartphone,
  TrendingUp,
  Award,
  Zap,
  BarChart3,
  Filter,
  Play,
  AlertCircle,
  Star
} from 'lucide-react';
import PhoneInput from '../components/PhoneInput';
import { sendDemoEmail } from '../services/emailService';
import './GestaoTarefas.css';
import Footer from '../components/Footer';

const GestaoTarefas = () => {
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
        tipo: 'Gestão de Tarefas'
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
      <div className="tarefas-success">
        <div className="container">
          <div className="tarefas-success-content">
            <div className="tarefas-success-icon">
              <CheckCircle size={64} />
            </div>
            <h1>Solicitação Enviada com Sucesso!</h1>
            <p>
              Obrigado pelo seu interesse em nossa solução de Gestão de Tarefas. 
              Nossa equipe entrará em contato em até 24 horas para agendar sua demonstração.
            </p>
            <div className="tarefas-success-info">
              <div className="tarefas-info-item">
                <Clock size={20} />
                <span>Resposta em 24h</span>
              </div>
              <div className="tarefas-info-item">
                <Users size={20} />
                <span>Demonstração personalizada</span>
              </div>
              <div className="tarefas-info-item">
                <CheckSquare size={20} />
                <span>Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gestao-tarefas-page">
      {/* Hero Section */}
      <section className="tarefas-hero">
        <div className="tarefas-hero-background">
          <img 
            src="/images/pilares/gestao-tarefas.png" 
            alt="Gestão de Tarefas" 
            className="tarefas-hero-bg-image"
          />
        </div>
        <div className="container">
          <div className="tarefas-hero-content">
            <div className="tarefas-hero-text">
              <div className="tarefas-professional-badge">
                <CheckSquare size={16} />
                <span>Solução de Gestão de Tarefas</span>
              </div>
              <h1>
                Organize e otimize a <span className="tarefas-gradient-text">gestão</span> de 
                tarefas com <span className="tarefas-highlight">eficiência máxima</span>
              </h1>
              <p>
                Centralize todas as tarefas da sua empresa em uma plataforma inteligente. 
                Aumente a produtividade, reduza prazos perdidos e melhore a colaboração entre equipes.
              </p>
              <div className="tarefas-hero-stats">
                <div className="tarefas-stat-item">
                  <Clock size={28} />
                  <strong>85%</strong>
                  <span>Mais produtividade</span>
                </div>
                <div className="tarefas-stat-item">
                  <CheckCircle size={28} />
                  <strong>95%</strong>
                  <span>Prazos cumpridos</span>
                </div>
                <div className="tarefas-stat-item">
                  <TrendingUp size={28} />
                  <strong>+60%</strong>
                  <span>Eficiência</span>
                </div>
              </div>
              <button 
                onClick={() => document.getElementById('tarefas-form').scrollIntoView({ behavior: 'smooth' })}
                className="tarefas-cta-button"
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
      <section className="tarefas-beneficios">
        <div className="container">
          <h2>Por que escolher nossa Gestão de Tarefas?</h2>
          <p className="tarefas-subtitle">
            Transforme a forma como sua empresa gerencia tarefas com uma solução completa e inteligente
          </p>
          <div className="tarefas-beneficios-grid">
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <Target size={32} />
              </div>
              <h3>Gestão por Objetivos</h3>
              <p>
                Defina metas claras, acompanhe progresso em tempo real e garanta 
                que todas as tarefas estejam alinhadas com os objetivos da empresa.
              </p>
            </div>
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <Users size={32} />
              </div>
              <h3>Colaboração em Equipe</h3>
              <p>
                Facilite a comunicação entre equipes, compartilhe responsabilidades 
                e mantenha todos informados sobre o progresso dos projetos.
              </p>
            </div>
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <Clock size={32} />
              </div>
              <h3>Controle de Prazos</h3>
              <p>
                Sistema inteligente de alertas e notificações para evitar atrasos, 
                com visibilidade completa dos prazos e dependências.
              </p>
            </div>
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Relatórios Avançados</h3>
              <p>
                Dashboards em tempo real com métricas de produtividade, 
                performance individual e de equipe, e análise de gargalos.
              </p>
            </div>
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <Smartphone size={32} />
              </div>
              <h3>Acesso Mobile</h3>
              <p>
                Aplicativo mobile completo para gerenciar tarefas de qualquer lugar, 
                com sincronização automática e notificações push.
              </p>
            </div>
            <div className="tarefas-beneficio-item">
              <div className="tarefas-beneficio-icon">
                <Zap size={32} />
              </div>
              <h3>Automação Inteligente</h3>
              <p>
                Automatize tarefas repetitivas, workflows e processos 
                para aumentar a eficiência e reduzir erros manuais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="tarefas-como-funciona">
        <div className="container">
          <h2>Como funciona nossa solução</h2>
          <p className="tarefas-subtitle">
            Processo simples e eficiente para implementar a gestão de tarefas
          </p>
          <div className="tarefas-steps-grid">
            <div className="tarefas-step-item">
              <div className="tarefas-step-number">1</div>
              <div className="tarefas-step-icon">
                <FileText size={32} />
              </div>
              <h3>Mapeamento de Processos</h3>
              <p>
                Nossa equipe mapeia todos os processos e tarefas da sua empresa 
                para criar uma estrutura organizacional eficiente.
              </p>
            </div>
            <div className="tarefas-step-item">
              <div className="tarefas-step-number">2</div>
              <div className="tarefas-step-icon">
                <Users size={32} />
              </div>
              <h3>Configuração de Equipes</h3>
              <p>
                Configuramos as equipes, responsabilidades e fluxos de trabalho 
                de acordo com a estrutura da sua empresa.
              </p>
            </div>
            <div className="tarefas-step-item">
              <div className="tarefas-step-number">3</div>
              <div className="tarefas-step-icon">
                <Play size={32} />
              </div>
              <h3>Implementação e Treinamento</h3>
              <p>
                Implementamos a solução e treinamos sua equipe no uso da plataforma 
                para garantir adoção rápida.
              </p>
            </div>
            <div className="tarefas-step-item">
              <div className="tarefas-step-number">4</div>
              <div className="tarefas-step-icon">
                <Award size={32} />
              </div>
              <h3>Otimização Contínua</h3>
              <p>
                Acompanhamos os resultados e otimizamos continuamente os processos 
                para maximizar a produtividade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="tarefas-recursos">
        <div className="container">
          <h2>Recursos da Plataforma</h2>
          <div className="tarefas-recursos-grid">
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <CheckSquare size={24} />
              </div>
              <h4>Gestão de Tarefas</h4>
              <p>Criação e acompanhamento de tarefas</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <Calendar size={24} />
              </div>
              <h4>Agendamento</h4>
              <p>Planejamento e cronograma</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <Users size={24} />
              </div>
              <h4>Atribuição</h4>
              <p>Delegação de responsabilidades</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <AlertCircle size={24} />
              </div>
              <h4>Notificações</h4>
              <p>Alertas e lembretes automáticos</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <BarChart3 size={24} />
              </div>
              <h4>Relatórios</h4>
              <p>Métricas e análises</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <Filter size={24} />
              </div>
              <h4>Filtros</h4>
              <p>Busca e organização avançada</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <Smartphone size={24} />
              </div>
              <h4>App Mobile</h4>
              <p>Acesso via smartphone</p>
            </div>
            <div className="tarefas-recurso-item">
              <div className="tarefas-recurso-icon">
                <Star size={24} />
              </div>
              <h4>Priorização</h4>
              <p>Classificação por importância</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tarefas-cta">
        <div className="container">
          <div className="tarefas-cta-content">
            <h2>Pronto para revolucionar a gestão de tarefas?</h2>
            <p>
              Junte-se a centenas de empresas que já transformaram a produtividade 
              com nossa plataforma de gestão de tarefas.
            </p>
            <button 
              onClick={() => document.getElementById('tarefas-form').scrollIntoView({ behavior: 'smooth' })}
              className="tarefas-cta-btn"
            >
              <Rocket size={20} />
              Solicitar Demonstração
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="tarefas-formulario-section" id="tarefas-form">
        <div className="container">
          <div className="tarefas-form-content">
            <div className="tarefas-form-header">
              <h2>Solicite sua Demonstração</h2>
              <p>
                Descubra como nossa solução pode transformar a gestão de tarefas da sua empresa. 
                Preencha o formulário e nossa equipe entrará em contato.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="tarefas-form">
              {error && <div className="tarefas-error-message">{error}</div>}
              <div className="tarefas-form-grid">
                <div className="tarefas-form-group">
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
                <div className="tarefas-form-group">
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
                <div className="tarefas-form-group">
                  <PhoneInput
                    id="telefone"
                    name="telefone"
                    label="Telefone *"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="tarefas-form-group">
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
                <div className="tarefas-form-group">
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
                <div className="tarefas-form-group tarefas-form-group-full">
                  <label htmlFor="mensagem">Mensagem (Opcional)</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre seus desafios atuais com gestão de tarefas..."
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="tarefas-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="tarefas-submit-spinner"></div>
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

export default GestaoTarefas; 